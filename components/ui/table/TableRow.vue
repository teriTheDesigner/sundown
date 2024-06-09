<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <tr
    :class="
      cn(
        'border-b transition-colors hover:bg-[#27272A]/50 data-[state=selected]:bg-slate-100 dark:hover:[#27272A] /50 dark:data-[state=selected]:bg-[#27272A]',
        props.class
      )
    "
  >
    <slot />
  </tr>
</template>
