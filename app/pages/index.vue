<script setup lang="ts">
import { marked } from 'marked'
import type { homepage } from '~/composables/useTypes';

const FetchingData = useRuntimeConfig().public.apiUrl;
// NOTE: TS warning ignored, data is guaranteed by SSR
const { data } = await useAsyncData<homepage>(
  'homepage',
  () => $fetch(`${FetchingData}/api/homepage`, {
    query: {
      'populate[navigation][populate][navbar][fields]': 'label,link',
      'populate[navigation][populate][cta][fields]': 'label,link',
      'populate[content][on][hero.full-image][populate][image][fields]': 'url,name',
      'populate[content][on][hero.full-image][populate][hoverImage][fields]': 'url,name',
      'populate[content][on][hero.flex-image][populate][image1][fields]': 'url,name',
      'populate[content][on][hero.flex-image][populate][image2][fields]': 'url,name',
      'populate[content][on][hero.flex-image][populate][hoverImage1][fields]': 'url,name',
      'populate[content][on][hero.flex-image][populate][hoverImage2][fields]': 'url,name',
      'populate[content][on][text.description][fields]': 'description',
      'populate[content][on][carousel.slider][populate][image][fields]': 'url,name',
      'populate[content][on][package.package][populate][types][populate][image][fields]': 'url,name',
      'populate[content][on][package.package][populate][types][populate][cta][fields]': 'label,link',
      'populate[content][on][cards.featured][populate][allCards][populate][logo][fields]': 'url,name',
      'populate[Footer][populate][SocialMedia][populate][image][fields]': 'url,name',
      'populate[Footer][populate][CustomerCare][fields]': 'label,link',
      'populate[Footer][populate][BackgroundImage][fields]': 'url,name',
      'populate[seo][populate][MetaImage][fields]': 'url,name'
    }
  }),
  {
    server: true,
    lazy: false,
    staleTime: 1000 * 60 * 5, // cache 5 menit
    watch: false,
    deep: false,
    default: () => null
  }
)

// NOTE: TS warning ignored, data is guaranteed by SSR
const NavBar = computed(()=> data.value?.data.navigation.navbar);
const Customercare = computed(()=> data.value?.data.Footer.CustomerCare);
const Socialmedia = computed(()=> data.value?.data.Footer.SocialMedia);
const CTA = computed(()=> data.value?.data.navigation.cta);
const ContentSections = computed(()=> data.value?.data.content);
const footerSection = computed(()=> data.value?.data.Footer);

const showPopup = ref(false);
const selectedPackage = ref<any>(null);

function openPopup(pkg:any){
    selectedPackage.value = pkg;
    showPopup.value = true
}
// NOTE: TS warning ignored, data is guaranteed by SSR
useSeoMeta({
    title: () => data.value?.data.seo.MetaTitle,
    description: () => data.value?.data.seo.MetaDescription,
    ogTitle: () => data.value?.data.seo.MetaTitle,
    ogDescription: () => data.value?.data.seo.MetaDescription,
    ogImage: () => data.value?.data.seo.MetaImage.url,
    twitterImage:()=> data.value?.data.seo.MetaImage.url,
});

useHead({
    meta:[
        {name:'viewport', content:'width=device-width, initial-scale=1' },
        {name: 'google-site-verification', content:'MebKa6o1sFc8B7bWhv1GepY4Cv02sbj1HHlq0gvURtA'}
    ],
    link:[{rel:'icon', type:'image/png', href:'/silverspace-tegallalang-logo.png'}]
});
</script>


<template>
    <!--Header-->
    <!-- NOTE: TS warning ignored, data is guaranteed by SSR -->
    <Header :data="data?.data"/>
    <Navbar :NavBar="NavBar" :CTA="CTA"/>
    <!--content-->
    <section v-for="Content in ContentSections" :key="Content.id">
        <!--Desktop-->
        <div v-if="Content.__component === 'hero.full-image'" class="relative w-full overflow-hidden group mt-8 hidden md:block">
            <NuxtImg :src="`${Content.image.url}`" :alt="Content.image.name" class="transition-all duration-300 w-full h-[400px] md:h-[576px] object-cover group-hover:opacity-0"/>
            <NuxtImg :src="`${Content.hoverImage.url}`" :alt="Content.hoverImage.name" class="transition-all duration-300 absolute inset-0 w-full h-[400px] md:h-[576px] object-cover opacity-0 group-hover:opacity-100"/>
        </div>
        <!--Mobile-->
        <div v-if="Content.__component === 'hero.flex-image'" class="relative w-full overflow-hidden mt-8 block md:hidden">
            <NuxtImg :src="`${Content.image1.url}`" :alt="Content.image1.name" class="w-full h-[400px] md:h-[576px] object-cover animate-carousel"/>
            <NuxtImg :src="`${Content.hoverImage1.url}`" :alt="Content.hoverImage1.name" class="absolute inset-0 w-full h-[400px] md:h-[576px] object-cover animate-carousel delay-1 "/>
            <NuxtImg :src="`${Content.image2.url}`" :alt="Content.image2.name" class="absolute inset-0 w-full h-[400px] md:h-[576px] object-cover animate-carousel delay-2"/>
            <NuxtImg :src="`${Content.hoverImage2.url}`" :alt="Content.hoverImage2.name" class="absolute inset-0 w-full h-[400px] md:h-[576px] object-cover animate-carousel delay-3"/>
        </div>
        <div v-if="Content.__component === 'hero.flex-image'"  class="md:flex justify-center items-center hidden">
            <span class="relative w-full overflow-hidden group">
                <NuxtImg :src="`${Content.image1.url}`" :alt="Content.image1.name" class="transition-all duration-300 w-full h-[576px] object-cover group-hover:opacity-0"/>
                <NuxtImg :src="`${Content.hoverImage1.url}`" :alt="Content.hoverImage1.name" class="transition-all duration-300 absolute inset-0 w-full h-[576px] object-cover opacity-0 group-hover:opacity-100"/>
            </span>
            <span class="relative w-full overflow-hidden group">
                <NuxtImg :src="`${Content.image2.url}`" :alt="Content.image2.name" class="transition-all duration-300 w-full h-[576px] object-cover group-hover:opacity-0"/>
                <NuxtImg :src="`${Content.hoverImage2.url}`" :alt="Content.hoverImage2.name" class="transition-all duration-300 absolute inset-0 w-full h-[576px] object-cover opacity-0 group-hover:opacity-100"/>
            </span>
        </div>
        <div v-if="Content.__component === 'text.description'" id="About">
            <h2 class="romanabt text-[24px] md:text-[32px] text-[#4B3E2A] text-center py-20 px-8 md:px-40">{{ Content.description }}</h2>
        </div>
        <div v-if="Content.__component === 'package.package'" id="Packages">
            <h4 class="romanabt text-[24px] md:text-[32px] text-[#4B3E2A] text-center py-5">{{ Content.Title }}</h4>
            <span class="flex justify-center items-center px-8 md:px-0">
                <p class="text-center text-[#4B3E2A] maisonneue w-[544px]">{{ Content.subTitle }}</p>
            </span>
        <!--Desktop Swiper option-->
        <!-- <ClientOnly>
            <swiper-container 
            ref="containerRef" 
            :space-between="30"
            :centered-slides="true"
            :breakpoints="{
                400:{
                    slidesPerView:1,
                },
                768:{
                    slidesPerView:2,
                },
                1024:{
                    slidesPerView:3,
                }
            }" class="hidden md:block">
                <swiper-slide v-for="packages in Content.types" :key="packages.id">
                    <ContentPackage :packages="packages" @click="openPopup"/>
                </swiper-slide>
            </swiper-container>
        </ClientOnly> -->
        <!--Mobile and Desktop option 2-->
        <main class="flex justify-center items-center">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center gap-8 px-8 md:px-20 lg:px-30">
                <div v-for="packages in Content.types" :key="Content.id" class="flex">
                    <ContentPackage :packages="packages" @click="openPopup"/>
                </div>
            </div>
        </main>
        <!-- popup -->
         <Transition
         enter-active-class="transition-all md:transition-opacity duration-300 ease-out"
         enter-from-class="translate-y-full md:opacity-0"
         enter-to-class="translate-y-0 md:opacity-100"
         leave-active-class="transition-all md:transition-opacity duration-300 ease-in"
         leave-from-class="translate-y-0 md:opacity-100"
         leave-to-class="translate-y-full md:opacity-0">
             <div v-if="showPopup" class="fixed inset-0 bg-black/50 flex justify-center items-end md:items-center z-50">
                <main class="bg-white w-[800px] h-[632px] overflow-y-auto px-8 hide-scrollbar">
                    <div class="sticky top-0 flex justify-between items-center bg-white w-full py-2">
                        <h3 class="romanabt text-[#4B3E2A] text-[20px]">{{ selectedPackage.Title }}</h3>
                        <NuxtImg @click="showPopup = false" src="/icon/closeBtn.svg" class="w-[24px] cursor-pointer"/>
                    </div>
                    <div class="flex flex-col gap-5 pt-5 pb-5">
                        <NuxtImg :src="`${selectedPackage.image.url}`" class="w-full h-[176px] md:h-[414px] object-cover"/>
                        <span class="block md:flex items-end gap-5">
                            <h3 class="romanabt text-[#4B3E2A] text-[32px]">{{ selectedPackage.Title }}</h3>
                            <h4 class="romanabt text-[#4B3E2A] text-[20px]">{{ selectedPackage.Price }}</h4>
                        </span>
                        <p class="text-[#4B3E2A] maisonneue">{{ selectedPackage.Brief }}</p>
                        <a :href="selectedPackage.cta.link" class="transition-all duration-300 border-1 border-[#4B3E2A] p-2 text-center romanabt text-[#4B3E2A] hover:text-white hover:bg-[#4B3E2A] w-[100px]">{{ selectedPackage.cta.label }}</a>
                        <p v-html="marked(selectedPackage.information)" class="prose prose-invert marker:text-[8px] text-[#4B3E2A]"></p>
                    </div>
                </main>
             </div>
         </Transition>
        </div>
        <div v-if="Content.__component === 'carousel.slider'" id="Gallery">
            <main class="relative flex overflow-hidden w-full py-30">
                <div class="flex items-center gap-10 animate-infinite-scroll">
                    <div class="flex items-center gap-10">
                        <NuxtImg v-for="IMG in Content.image" :key="Content.id" :src="`${IMG.url}`" :alt="IMG.name" class="w-[312px] md:w-[544px] h-[390px] md:h-[680px] object-cover"/>
                    </div>
                     <div class="flex items-center gap-10">
                        <NuxtImg aria-hidden="true" v-for="IMG in Content.image" :key="Content.id" :src="`${IMG.url}`" :alt="IMG.name" class="w-[312px] md:w-[544px] h-[390px] md:h-[680px] object-cover"/>
                    </div>
                </div>
            </main>
        </div>
        <div v-if="Content.__component === 'cards.featured'" class="px-8 md:px-30" id="Info">
            <h4 class="romanabt text-[#4B3E2A] text-[24px] md:text-[32px] text-center py-5">{{ Content.Title }}</h4>
            <p class="text-center text-[#4B3E2A] maisonneue">{{ Content.description }}</p>
            <main class="flex flex-col lg:flex-row justify-center items-center gap-5 py-10">
                <div v-for="Cards in Content.allCards" :key="Cards.id" class="flex flex-col justify-center items-center bg-[#f0eeea] w-full h-[312px] lg:w-[271px] lg:h-[271px] p-5">
                    <span class="bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center">
                        <NuxtImg :src="`${Cards.logo.url}`" :alt="Cards.logo.name" class="w-[20px] object-contain"/>
                    </span>
                    <span class="flex flex-col justify-center items-center text-center gap-5 px-3">
                        <h5 class="romanabt text-[#4B3E2A] text-[20px]">{{ Cards.Title }}</h5>
                        <p class="text-[#4B3E2A] maisonneue">{{ Cards.description }}</p>
                    </span>
                </div>
            </main>
        </div>
    </section>
    <footer class="relative">
        <NuxtImg :src="`${footerSection?.BackgroundImage.url}`" class="w-full h-[500px] md:h-[420px] object-cover brightness-80"/>
        <div class="absolute top-16 md:top-20 lg:top-30 flex justify-start items-center px-8 md:px-30 z-10">
            <div class="flex justify-center items-center gap-5">
                <span v-for="socialmedia in Socialmedia" :key="socialmedia.id">
                    <a :href="socialmedia.link">
                        <span class="bg-[#faf7f20d] p-3 w-[46px] h-[46px] rounded-full overflow-hidden bg-[#faf7f20d] flex items-center justify-center">
                            <NuxtImg :src="`${socialmedia.image.url}`" :alt="socialmedia.image.name" class="w-full h-full object-contain"/>
                        </span>
                    </a>
                </span>
            </div>
        </div>
        <div class="absolute inset-0 flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center px-8 md:px-30">
            <h4 class="romanabt text-[24px] md:text-[48px] text-white">{{ footerSection?.Title }}</h4>
            <div class="py-5 md:py-0">
                 <nav class="flex justify-center items-start gap-30">
                    <ul class="flex flex-col justify-center gap-2 romanabt">
                        <li class="text-white text-[20px]">Menu</li>
                        <li v-for="navbar in NavBar" :key="navbar.id"><a :href="navbar.link" class="text-white hover:underline">{{ navbar.label }}</a></li>
                    </ul>
                    <ul class="flex flex-col justify-center gap-2 romanabt">
                        <li class="text-white text-[20px]">Customer Care</li>
                        <li v-for="customer in Customercare" :key="customer.id"><a :href="customer.link" class="text-white hover:underline">{{ customer.label }}</a></li>
                    </ul>  
                </nav>
            </div>
        </div>
        <div class="absolute flex flex-col justify-center items-center px-8 md:px-30 bottom-10 w-full">
            <span class="border-1 border-white w-full"></span>
            <p class="romanabt text-white text-center mt-5 pb-10 md:pb-0">Copyright © 2025, Silver Space Tegallalang</p>
        </div>
    </footer>
</template>

<style scoped>
@keyframes carousel {
   0% { opacity: 0; }      
  4% { opacity: 1; }     
  21% { opacity: 1; }     
  29% { opacity: 0; }     
  100% { opacity: 0; }  
}

.animate-carousel {
  animation: carousel 12s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
  opacity: 0;
}

.delay-1{
    animation-delay: 3s;
}
.delay-2{
    animation-delay: 6s;
}
.delay-3{
    animation-delay: 9s;
}
</style>