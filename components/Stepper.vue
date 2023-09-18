<script setup>
import { useSteps } from "../store/stepper";

const stepperStore = useSteps();

function toStep1() {
  stepperStore.setStep("step1");
}

function toStep2() {
  stepperStore.setStep("step2");
}

function toStep3() {
  stepperStore.setStep("step3");
}
function toStep4() {
  stepperStore.setStep("step4");
}
const isStepDisabled = (step) => {
  if (stepperStore.editMode) {
    return false;
  }

  const stepValues = {
    step1: 1,
    step2: 2,
    step3: 3,
    step4: 4,
  };

  const currentStepValue = stepValues[stepperStore.step];
  const targetStepValue = stepValues[step];
  return currentStepValue < targetStepValue;
};
</script>
<template>
  <div class="pt-8 pb-8">
    <div class="content-container mx-auto flex justify-center items-center">
      <NuxtLink to="/step1"
        ><button
          @click="toStep1"
          :disabled="!stepperStore.editMode && isStepDisabled('step1')"
          class="flex flex-col items-center justify-center h-8 w-8 rounded-full bg-white text-black"
        >
          1
        </button>
      </NuxtLink>
      <span class="w-48 h-1 bg-white"></span>
      <NuxtLink to="/step2"
        ><button
          @click="toStep2"
          :disabled="!stepperStore.editMode && isStepDisabled('step2')"
          class="flex flex-col items-center justify-center h-8 w-8 rounded-full bg-white text-black"
        >
          2
        </button>
      </NuxtLink>
      <span class="w-48 h-1 bg-white"></span>
      <NuxtLink to="/step3"
        ><button
          class="flex flex-col items-center justify-center h-8 w-8 rounded-full bg-white text-black"
          @click="toStep3"
          :disabled="!stepperStore.editMode && isStepDisabled('step3')"
        >
          3
        </button>
      </NuxtLink>
      <span class="w-48 h-1 bg-white"></span>
      <NuxtLink to="/step4"
        ><button
          class="flex flex-col items-center justify-center h-8 w-8 rounded-full bg-white text-black"
          @click="toStep4"
          :disabled="!stepperStore.editMode && isStepDisabled('step4')"
        >
          4
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
