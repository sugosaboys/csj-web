<template>
    <nav class="bg-white fixed md:sticky bottom-0 md:top-0 z-50 py-2 md:py-5 w-full">
        <ul class="flex justify-center items-center md:gap-8 romanabt">
            <li v-for="navbar in props.NavBar" :key="navbar.id"><a :href="navbar.link" class="hidden md:block text-[#4B3E2A] hover:underline">{{ navbar.label }}</a></li>
            <li class="flex md:block"><a :href="props.CTA?.link" class="transition-all duration-300 w-[300px] border-1 border-[#4B3E2A] p-2 text-[#4B3E2A] text-center hover:text-white hover:bg-[#4B3E2A]">{{ props.CTA?.label }}</a></li>
        </ul>   
    </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
    NavBar?: {
        id: number;
        label: string;
        link: string;
    }[];
    CTA?: {
        label: string;
        link: string;
    };
}>();
</script>