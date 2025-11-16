<template>
  <article class="flex mt-10">
    <main class="w-full md:w-[544px] h-full">
      <NuxtImg
        :src="`${packages.image.url}`"
        :alt="packages.image.name"
        class="w-[400px] md:w-[544px] h-[312px] md:h-[544px] object-cover"
      />
      <div class="flex flex-col p-2 gap-2">
        <h4 class="romanabt text-[#4B3E2A] text-[20px]">
          {{ packages.Title }}
        </h4>
        <div
          v-html="marked(packages.description)"
          class="prose prose-invert marker:text-[8px] maisonneue text-[#4B3E2A]"
        ></div>
        <p class="romanabt text-[#4B3E2A]">{{ packages.Price }}</p>
        <span class="flex items-center gap-5 romanabt">
          <a
            :href="packages.cta.link"
            class="transition-all duration-300 border-1 border-[#4B3E2A] p-2 text-[#4B3E2A] hover:text-white hover:bg-[#4B3E2A]"
            >{{ packages.cta.label }}</a
          >
          <span
            @click="$emit('click', packages)"
            class="flex items-center gap-2 text-[#4B3E2A] border-transparent border-b-1 hover:border-b-1 hover:border-[#4B3E2A] cursor-pointer"
          >
            <p>More Info</p>
            <svg
              width="7"
              height="11"
              viewBox="0 0 7 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.2905 5.34425L0.21725 1.27125C0.0789167 1.13275 0.00808339 0.958667 0.00475006 0.749001C0.00158339 0.539501 0.0724167 0.36225 0.21725 0.21725C0.36225 0.0724167 0.537916 0 0.74425 0C0.950583 0 1.12625 0.0724167 1.27125 0.21725L5.7655 4.7115C5.859 4.80517 5.925 4.90392 5.9635 5.00775C6.002 5.11158 6.02125 5.22375 6.02125 5.34425C6.02125 5.46475 6.002 5.57692 5.9635 5.68075C5.925 5.78458 5.859 5.88333 5.7655 5.977L1.27125 10.4713C1.13275 10.6096 0.958666 10.6804 0.749 10.6838C0.5395 10.6869 0.36225 10.6161 0.21725 10.4713C0.0724167 10.3263 0 10.1506 0 9.94425C0 9.73792 0.0724167 9.56225 0.21725 9.41725L4.2905 5.34425Z"
                fill="#4B3E2A"
              />
            </svg>
          </span>
        </span>
      </div>
    </main>
  </article>
</template>


<script setup lang="ts">
import { marked } from 'marked';
defineProps<{
    packages: {
        Title: string;
        description: string;
        Price: string;
        image: {
        url: string;
        name: string;
        };
        cta: {
        label: string;
        link: string;
        };
    };
}>();
const emit = defineEmits<{
  (e: 'click', pkg: any): void;
}>();
</script>