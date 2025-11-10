<script setup lang="ts">
import { marked } from 'marked'
import type { homepage } from '~/composables/useTypes';

const FetchingData = useRuntimeConfig().public.apiUrl;
const { data } = await useFetch<homepage>(`${FetchingData}/api/homepage`,{
    server:true,
    lazy:false,
    key:'homepage',
    query:{
    'populate[navigation][populate]': '*',
    'populate[content][on][hero.full-image][populate]': '*',
    'populate[content][on][hero.flex-image][populate]': '*',
    'populate[content][on][text.description][populate]': '*',
    'populate[content][on][carousel.slider][populate]': '*',
    'populate[content][on][package.package][populate][types][populate]': '*', 
    'populate[content][on][cards.featured][populate][allCards][populate]': '*', 
    'populate[Footer][populate][SocialMedia][populate]': 'image',
    'populate[Footer][populate][CustomerCare][populate]': '*',
    'populate[Footer][populate]': 'BackgroundImage',
    }
});

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

console.log(data?.value);
</script>


<template>
    <!--Header-->
    <header class="pt-8">
        <span v-for="heading in data" class="text-[#4B3E2A]">
            <h4 class="romanabt text-center">{{ heading.heading }}</h4>
            <h1 class="romanabt text-center text-[48px]">{{ heading.Title }}</h1>
        </span>
    </header>
    <nav class="bg-white sticky top-0 z-50 py-5">
        <ul class="flex justify-center items-center gap-8 romanabt">
            <li v-for="navbar in NavBar"><a :href="navbar.link" class="text-[#4B3E2A] hover:underline">{{ navbar.label }}</a></li>
            <li><a :href="CTA?.link" class="transition-all duration-300 border-1 border-[#4B3E2A] p-2 text-[#4B3E2A] hover:text-white hover:bg-[#4B3E2A]">{{ CTA?.label }}</a></li>
        </ul>   
    </nav>
    <!--content-->
    <section v-for="Content in ContentSections">
        <div v-if="Content.__component === 'hero.full-image'" class="relative w-full overflow-hidden group mt-8">
            <NuxtImg :src="`http://localhost:1337${Content.image.url}`" :alt="Content.image.name" class="transition-all duration-300 w-full h-[576px] object-cover group-hover:opacity-0"/>
            <NuxtImg :src="`http://localhost:1337${Content.hoverImage.url}`" :alt="Content.hoverImage.name" class="transition-all duration-300 absolute inset-0 w-full h-[576px] object-cover opacity-0 group-hover:opacity-100"/>
        </div>
        <div v-if="Content.__component === 'hero.flex-image'" class="flex justify-center items-center">
            <span class="relative w-full overflow-hidden group">
                <NuxtImg :src="`http://localhost:1337${Content.image1.url}`" :alt="Content.image1.name" class="transition-all duration-300 w-full h-[576px] object-cover group-hover:opacity-0"/>
                <NuxtImg :src="`http://localhost:1337${Content.hoverImage1.url}`" :alt="Content.hoverImage1.name" class="transition-all duration-300 absolute inset-0 w-full h-[576px] object-cover opacity-0 group-hover:opacity-100"/>
            </span>
            <span class="relative w-full overflow-hidden group">
                <NuxtImg :src="`http://localhost:1337${Content.image2.url}`" :alt="Content.image2.name" class="transition-all duration-300 w-full h-[576px] object-cover group-hover:opacity-0"/>
                <NuxtImg :src="`http://localhost:1337${Content.hoverImage2.url}`" :alt="Content.hoverImage2.name" class="transition-all duration-300 absolute inset-0 w-full h-[576px] object-cover opacity-0 group-hover:opacity-100"/>
            </span>
        </div>
        <div v-if="Content.__component === 'text.description'">
            <h2 class="romanabt text-[32px] text-[#4B3E2A] text-center py-20 px-40">{{ Content.description }}</h2>
        </div>
        <div v-if="Content.__component === 'package.package'">
            <h4 class="romanabt text-[32px] text-[#4B3E2A] text-center py-5">{{ Content.Title }}</h4>
            <span class="flex justify-center items-center">
                <p class="text-center text-[#4B3E2A] font-regular w-[544px]">{{ Content.subTitle }}</p>
            </span>
        <ClientOnly>
            <swiper-container 
            ref="containerRef" 
            :slides-per-view="3" 
            :space-between="30"
            :centered-slides="true">
                <swiper-slide v-for="packages in Content.types" :key="packages.Title">
                    <article class="flex mt-10">
                        <main class="w-[544px] h-full">
                            <NuxtImg :src="`http://localhost:1337${packages.image.url}`" :alt="packages.image.name" class="w-[544px] h-[544px] object-cover"/>
                            <div class="flex flex-col p-2 gap-2">
                                <h4 class="romanabt text-[#4B3E2A] text-[20px]">{{ packages.Title }}</h4>
                                <li v-html="marked(packages.description)" class="prose prose-invert marker:text-[8px] text-[#4B3E2A]"></li>
                                <p class="romanabt text-[#4B3E2A]">{{ packages.Price }}</p>
                                <span class="flex items-center gap-5 romanabt">
                                    <a :href="packages.cta.link" class="transition-all duration-300 border-1 border-[#4B3E2A] p-2 text-[#4B3E2A] hover:text-white hover:bg-[#4B3E2A]">{{ packages.cta.label }}</a>
                                    <span @click="openPopup(packages)" class="flex items-center gap-2 text-[#4B3E2A] border-transparent border-b-1 hover:border-b-1 hover:border-[#4B3E2A] cursor-pointer">
                                        <p>More Info</p>
                                        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.2905 5.34425L0.21725 1.27125C0.0789167 1.13275 0.00808339 0.958667 0.00475006 0.749001C0.00158339 0.539501 0.0724167 0.36225 0.21725 0.21725C0.36225 0.0724167 0.537916 0 0.74425 0C0.950583 0 1.12625 0.0724167 1.27125 0.21725L5.7655 4.7115C5.859 4.80517 5.925 4.90392 5.9635 5.00775C6.002 5.11158 6.02125 5.22375 6.02125 5.34425C6.02125 5.46475 6.002 5.57692 5.9635 5.68075C5.925 5.78458 5.859 5.88333 5.7655 5.977L1.27125 10.4713C1.13275 10.6096 0.958666 10.6804 0.749 10.6838C0.5395 10.6869 0.36225 10.6161 0.21725 10.4713C0.0724167 10.3263 0 10.1506 0 9.94425C0 9.73792 0.0724167 9.56225 0.21725 9.41725L4.2905 5.34425Z" fill="#4B3E2A"/>
                                        </svg>
                                    </span>
                                </span>
                            </div>
                            </main>
                    </article>
                </swiper-slide>
            </swiper-container>
        </ClientOnly>
        <!-- popup -->
         <div v-if="showPopup" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <main class="bg-white w-[800px] h-[632px] overflow-y-auto px-8 hide-scrollbar">
                <div class="sticky top-0 flex justify-between items-center bg-white w-full py-2">
                    <h3 class="romanabt text-[#4B3E2A] text-[20px]">{{ selectedPackage.Title }}</h3>
                    <NuxtImg @click="showPopup = false" src="/icon/closeBtn.svg" class="w-[24px] cursor-pointer"/>
                </div>
                <div class="flex flex-col gap-5 pt-5 pb-5">
                    <NuxtImg :src="`http://localhost:1337${selectedPackage.image.url}`" class="w-full h-[414px] object-cover"/>
                    <span class="flex items-end gap-5">
                        <h3 class="romanabt text-[#4B3E2A] text-[32px]">{{ selectedPackage.Title }}</h3>
                        <h4 class="romanabt text-[#4B3E2A] text-[20px]">{{ selectedPackage.Price }}</h4>
                    </span>
                    <p class="text-[#4B3E2A]">{{ selectedPackage.Brief }}</p>
                    <a :href="selectedPackage.cta.link" class="transition-all duration-300 border-1 border-[#4B3E2A] p-2 text-center romanabt text-[#4B3E2A] hover:text-white hover:bg-[#4B3E2A] w-[100px]">{{ selectedPackage.cta.label }}</a>
                    <p v-html="marked(selectedPackage.information)" class="prose prose-invert marker:text-[8px] text-[#4B3E2A]"></p>
                </div>
            </main>
         </div>
        </div>
        <div v-if="Content.__component === 'carousel.slider'">
            <main class="relative flex overflow-hidden w-full py-30">
                <div class="flex items-center gap-10 animate-infinite-scroll">
                    <div class="flex items-center gap-10">
                        <NuxtImg v-for="IMG in Content.image" :src="`http://localhost:1337${IMG.url}`" :alt="IMG.name" class="w-[544px] h-[680px] object-cover"/>
                    </div>
                     <div class="flex items-center gap-10">
                        <NuxtImg aria-hidden="true" v-for="IMG in Content.image" :src="`http://localhost:1337${IMG.url}`" :alt="IMG.name" class="w-[544px] h-[680px] object-cover"/>
                    </div>
                </div>
            </main>
        </div>
        <div v-if="Content.__component === 'cards.featured'" class="px-30">
            <h4 class="romanabt text-[#4B3E2A] text-[32px] text-center py-5">{{ Content.Title }}</h4>
            <p class="text-center text-[#4B3E2A] font-regular">{{ Content.description }}</p>
            <main class="flex justify-center items-center gap-5 py-10">
                <div v-for="Cards in Content.allCards" class="bg-[#f0eeea] w-[271px] h-[271px] p-5">
                    <span class="flex justify-center items-center py-5">
                        <NuxtImg :src="`http://localhost:1337${Cards.logo.url}`" :alt="Cards.logo.name" class="w-[20px] object-cover"/>
                    </span>
                    <span class="flex flex-col justify-center items-center text-center gap-5">
                        <h5 class="romanabt text-[#4B3E2A] text-[20px]">{{ Cards.Title }}</h5>
                        <p class="font-regular">{{ Cards.description }}</p>
                    </span>
                </div>
            </main>
        </div>
    </section>
    <footer class="relative">
        <NuxtImg :src="`http://localhost:1337${footerSection?.BackgroundImage.url}`" class="w-full h-[420px] object-cover brightness-80"/>
        <div class="absolute top-30 flex justify-start items-center px-30 z-10">
            <div class="flex justify-center items-center gap-5">
                <span v-for="socialmedia in Socialmedia">
                    <a :href="socialmedia.link">
                        <span class="bg-[#faf7f20d] p-3 w-[46px] h-[46px] rounded-full overflow-hidden bg-[#faf7f20d] flex items-center justify-center">
                            <NuxtImg :src="`http://localhost:1337${socialmedia.image.url}`" :alt="socialmedia.image.name" class="w-full h-full object-contain"/>
                        </span>
                    </a>
                </span>
            </div>
        </div>
        <div class="absolute inset-0 flex justify-between items-center px-30">
            <h4 class="romanabt text-[48px] text-white">{{ footerSection?.Title }}</h4>
            <div>
                 <nav class="flex justify-center items-start gap-30">
                    <ul class="flex flex-col justify-center gap-2 romanabt">
                        <li class="text-white text-[20px]">Menu</li>
                        <li v-for="navbar in NavBar"><a :href="navbar.link" class="text-white hover:underline">{{ navbar.label }}</a></li>
                    </ul>
                    <ul class="flex flex-col justify-center gap-2 romanabt">
                        <li class="text-white text-[20px]">Customer Care</li>
                        <li v-for="customer in Customercare"><a :href="customer.link" class="text-white hover:underline">{{ customer.label }}</a></li>
                    </ul>  
                </nav>
            </div>
        </div>
        <div class="absolute flex flex-col justify-center items-center px-30 bottom-10 w-full">
            <span class="border-1 border-white w-full"></span>
            <p class="romanabt text-white text-center mt-5">Copyright © 2025, Canggu Silver Jewelry Class</p>
        </div>
    </footer>
</template>