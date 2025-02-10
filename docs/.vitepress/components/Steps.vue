<template>
  <div class="steps-container">
    <div v-for="(step, index) in steps" :key="index" class="step">
      <div class="step-number">{{ step.number }}</div>
      <div class="step-content">
        <div v-html="step.content"></div>
        <ul v-if="step.children.length" class="step-children">
          <li
            v-for="(child, childIndex) in step.children"
            :key="childIndex"
            v-html="child"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Steps",
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  computed: {
    steps() {
      const lines = this.content.split("\n");
      const steps = [];
      let currentStep = null;

      for (const line of lines) {
        if (line.match(/^\d+\./)) {
          if (currentStep) {
            steps.push(currentStep);
          }
          const [number, ...contentParts] = line.split(".");
          currentStep = {
            number: number.trim(),
            content: contentParts.join(".").trim(),
            children: [],
          };
        } else if (line.trim().startsWith("-") && currentStep) {
          currentStep.children.push(line.trim().substring(1).trim());
        } else if (currentStep) {
          currentStep.content += " " + line.trim();
        }
      }

      if (currentStep) {
        steps.push(currentStep);
      }

      return steps;
    },
  },
};
</script>

<style scoped>
.steps-container {
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
}

.step {
  display: flex;
  position: relative;
  margin-bottom: 1.5rem;
  padding-left: 2.5rem;
}

.step-number {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.75rem;
  height: 1.75rem;
  background-color: rgba(168, 177, 255, 0.2);
  border-radius: 50%;
  color: var(--vp-c-text-1);
}

.step-content {
  flex: 1;
}

.step-children {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  list-style-type: circle;
}

.step-children li {
  margin-bottom: 0.25rem;
}
</style>
