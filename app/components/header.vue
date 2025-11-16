<template>
       <header class="pt-8">
        <span :key="props.data?.id" class="text-[#4B3E2A]">
            <h1 class="romanabt text-center">{{ props.data?.heading }}</h1>
            <h4 class="romanabt text-center text-[24px] md:text-[48px]">{{ props.data?.Title }}</h4>
        </span>
    </header>
</template>

<script setup lang="ts">
const props = defineProps<{
    data?:{
        id: number;
        heading: string;
        Title: string;
    };
}>();
</script>