import { CodeBlock } from "@/components/CodeBlock";

export default function VueDocsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                    Vue 3
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-2">Vue.js Integration</h1>
                <p className="text-slate-400">Hướng dẫn sử dụng với Vue 3 Composition API</p>
            </div>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📦 Installation</h2>
                <CodeBlock
                    language="bash"
                    code={`npm install @xdev-asia/vietnam-map-34-provinces highcharts`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🚀 Basic Usage</h2>
                <CodeBlock
                    language="vue"
                    code={`<template>
  <div ref="mapContainer" style="height: 600px"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

const mapContainer = ref(null);
let mapInstance = null;

onMounted(() => {
  mapInstance = createVietnamMap(mapContainer.value, {
    drilldown: { enabled: true },
    onProvinceClick: (province) => {
      console.log('Clicked:', province.name);
    }
  });
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy();
  }
});
</script>`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🎯 Composable Hook</h2>
                <CodeBlock
                    language="javascript"
                    code={`// composables/useVietnamMap.js
import { ref, onMounted, onUnmounted } from 'vue';
import { createVietnamMap } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

export function useVietnamMap(containerRef, options = {}) {
  const instance = ref(null);
  const currentProvince = ref(null);
  const loading = ref(false);
  
  onMounted(() => {
    if (!containerRef.value) return;
    
    instance.value = createVietnamMap(containerRef.value, {
      ...options,
      drilldown: {
        enabled: true,
        onDrilldown: (province) => {
          currentProvince.value = province.name;
        },
        onDrillup: () => {
          currentProvince.value = null;
        },
        onLoading: (isLoading) => {
          loading.value = isLoading;
        }
      }
    });
  });
  
  onUnmounted(() => {
    instance.value?.destroy();
  });
  
  const zoomToProvince = (id) => instance.value?.zoomToProvince(id);
  const resetZoom = () => instance.value?.resetZoom();
  const drilldownTo = (name) => instance.value?.drilldownTo(name);
  const drillUp = () => instance.value?.drillUp();
  
  return {
    instance,
    currentProvince,
    loading,
    zoomToProvince,
    resetZoom,
    drilldownTo,
    drillUp
  };
}`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📊 Using Province Data</h2>
                <CodeBlock
                    language="vue"
                    code={`<template>
  <div>
    <h2>Province Statistics</h2>
    <p>Total: {{ stats.totalProvinces }} provinces</p>
    <p>Communes: {{ stats.totalCommunes }}</p>
    
    <ul>
      <li v-for="province in provinces" :key="province.code">
        {{ province.name }} ({{ province.merged_from?.length || 0 }} merged)
      </li>
    </ul>
  </div>
</template>

<script setup>
import { NEW_34_PROVINCES, getProvinceStats } from '@xdev-asia/vietnam-map-34-provinces/core';

const provinces = NEW_34_PROVINCES;
const stats = getProvinceStats();
</script>`}
                />
            </section>

            <div className="flex justify-between pt-8 mt-8 border-t border-white/10">
                <a href="/docs/react" className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">
                    ← React
                </a>
                <a href="/docs/angular" className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600">
                    Angular →
                </a>
            </div>
        </div>
    );
}
