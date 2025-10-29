<template>
  <div class="resume-container">
    <h1>Hi, I’m Zhiyuan Zhou 👋</h1>
    <p class="subtitle">
      A software engineer from China, currently working at <strong>EasyStack, Inc.</strong>  
      Focusing on cloud-native observability development and building solutions for cloud monitoring systems.
    </p>

    <section>
      <h2>🎓 Education</h2>
      <p>Graduated from <strong>Anhui University of Technology</strong> with a Master’s degree in Engineering.</p>
    </section>

    <section>
      <h2>💻 Passions</h2>
      <p>
        Exploring open-source technologies and sharing knowledge with the community.  
        Believe that a small step in open source can drive a giant leap in global technology.
      </p>
    </section>

    <section>
      <h2>🛠️ Open Source Contributions</h2>
      <ul>
        <li><a href="https://github.com/prometheus/procfs/pull/719" target="_blank">procfs #719</a> ✅ Already merged</li>
        <li><a href="https://github.com/ncabatoff/process-exporter/pull/353" target="_blank">process-exporter #353</a> ⏳ Waiting for merge</li>
      </ul>
    </section>

    <section>
      <h2>📬 Contact Me</h2>
      <p><a href="mailto:zzy_ahut@163.com">zzy_ahut@163.com</a></p>
    </section>
  </div>
</template>

<script setup>
// 无需脚本逻辑，这个组件纯展示内容
</script>

<style scoped>
.resume-container {
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 16px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  line-height: 1.7;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.subtitle {
  font-size: 1.05rem;
  margin-bottom: 2rem;
}

section {
  margin-bottom: 1.8rem;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-brand-2);
}

ul {
  padding-left: 1.2rem;
}

li {
  margin-bottom: 0.3rem;
}

a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
