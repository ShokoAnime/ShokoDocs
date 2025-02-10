<!-- .vitepress/theme/NotFound.vue -->
<script setup>
import { useData } from "vitepress";

const { site } = useData();
</script>

<template>
  <div class="not-found-outer">
    <div class="not-found-inner">
      <div class="content">
        <h1>Lost in Space</h1>
        <p class="tagline">Nothing to see here, literally</p>
        <p>
          It appears that the page you were trying to access has either been
          moved or the URL is incorrect. Here are some steps to help you find
          what you were looking for:
        </p>
        <ul>
          <li>Check the URL for any malformed parts.</li>
          <li>
            Use the search function located above or press
            <code>CTRL+K</code> for Windows or <code>CMD+K</code> for MAC.
          </li>
          <li>
            Since your time is valuable, hop on Discord blame
            <strong>Elemental Crisis</strong>.
          </li>
        </ul>
        <a :href="site.base" class="home-link">→ Return to home</a>
      </div>
      <div class="error-code">404</div>
    </div>
  </div>
</template>

<style scoped>
.not-found-outer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
}

.not-found-inner {
  max-width: 1440px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  background-color: var(--vp-c-bg-soft);
  padding: 4rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.content {
  flex: 1;
  max-width: 850px;
}

.error-code {
  background: linear-gradient(90deg, #418dcc, #93a1b2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 12rem;
  font-weight: bold;
  line-height: 1;
}

h1 {
  font-size: 4rem;
  margin-bottom: 2rem;
}

.tagline {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.75;
}

p,
ul {
  font-size: 1rem;
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.5rem;
  list-style: circle;
}

code {
  background-color: var(--vp-code-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

.home-link {
  display: inline-block;
  border: 1px solid var(--vp-c-bg);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  transition:
    border-color 0.25s,
    background-color 0.25s;
  padding: 1rem;
  width: auto;
  text-decoration: none;
  margin-top: 1rem;
}

.home-link:hover {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
}

@media screen and (max-width: 1024px) {
  .not-found-inner {
    flex-direction: column-reverse;
    padding: 2rem;
    gap: 2rem;
  }

  .error-code {
    font-size: 8rem;
  }

  h1 {
    text-align: center;
  }

  .tagline {
    text-align: center;
  }

  .home-link {
    width: 100%;
    text-align: center;
  }

  ul {
    text-align: left;
  }
}

@media screen and (max-width: 640px) {
  .not-found-outer {
    padding: 1rem;
  }

  .not-found-inner {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .error-code {
    font-size: 6rem;
  }
}
</style>
