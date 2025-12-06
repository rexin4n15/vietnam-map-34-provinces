import { CodeBlock } from "@/components/CodeBlock";

export default function AngularDocsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                    Angular
                </span>
                <h1 className="text-4xl font-bold mt-4 mb-2">Angular Integration</h1>
                <p className="text-slate-400">Hướng dẫn sử dụng với Angular 17+ (standalone components)</p>
            </div>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📦 Installation</h2>
                <CodeBlock
                    language="bash"
                    code={`npm install @xdev-asia/vietnam-map-34-provinces highcharts`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🚀 Basic Component</h2>
                <CodeBlock
                    language="typescript"
                    code={`// vietnam-map.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { createVietnamMap, VietnamMapInstance, ProvinceData } from '@xdev-asia/vietnam-map-34-provinces/vanilla';

@Component({
  selector: 'app-vietnam-map',
  standalone: true,
  template: \`
    <div class="map-wrapper">
      <div *ngIf="loading" class="loading-overlay">Loading...</div>
      <div #mapContainer [style.height.px]="height"></div>
    </div>
  \`,
  styles: [\`
    .map-wrapper { position: relative; }
    .loading-overlay {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.5); color: white; z-index: 10;
    }
  \`]
})
export class VietnamMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  
  @Input() height = 600;
  @Input() drilldown = true;
  @Input() data: any[] = [];
  
  @Output() provinceClick = new EventEmitter<ProvinceData>();
  
  private mapInstance: VietnamMapInstance | null = null;
  loading = false;
  
  ngAfterViewInit(): void {
    this.initMap();
  }
  
  ngOnDestroy(): void {
    this.mapInstance?.destroy();
  }
  
  private initMap(): void {
    this.mapInstance = createVietnamMap(this.mapContainer.nativeElement, {
      height: this.height,
      data: this.data.length ? this.data : undefined,
      drilldown: this.drilldown ? {
        enabled: true,
        onLoading: (isLoading) => this.loading = isLoading
      } : false,
      onProvinceClick: (province) => this.provinceClick.emit(province)
    });
  }
  
  zoomToProvince(id: string): void {
    this.mapInstance?.zoomToProvince(id);
  }
  
  resetZoom(): void {
    this.mapInstance?.resetZoom();
  }
  
  drilldownTo(name: string): void {
    this.mapInstance?.drilldownTo(name);
  }
  
  drillUp(): void {
    this.mapInstance?.drillUp();
  }
}`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">📋 Usage in Parent Component</h2>
                <CodeBlock
                    language="typescript"
                    code={`// app.component.ts
import { Component } from '@angular/core';
import { VietnamMapComponent } from './vietnam-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VietnamMapComponent],
  template: \`
    <div class="app">
      <h1>Vietnam Map Demo</h1>
      
      <app-vietnam-map
        [height]="650"
        [drilldown]="true"
        [data]="mapData"
        (provinceClick)="onProvinceClick($event)"
      ></app-vietnam-map>
      
      <div *ngIf="selectedProvince">
        Selected: {{ selectedProvince.name }}
      </div>
    </div>
  \`
})
export class AppComponent {
  selectedProvince: any = null;
  
  mapData = [
    { 'hc-key': 'vn-new-ha-noi', value: 5000 },
    { 'hc-key': 'vn-new-ho-chi-minh', value: 8000 }
  ];
  
  onProvinceClick(province: any): void {
    this.selectedProvince = province;
    console.log('Clicked:', province);
  }
}`}
                />
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/10">🔧 Service for Province Data</h2>
                <CodeBlock
                    language="typescript"
                    code={`// province.service.ts
import { Injectable } from '@angular/core';
import { 
  NEW_34_PROVINCES, 
  getProvinceStats, 
  getProvinceCommunes
} from '@xdev-asia/vietnam-map-34-provinces/core';

@Injectable({ providedIn: 'root' })
export class ProvinceService {
  
  getProvinces() {
    return NEW_34_PROVINCES;
  }
  
  getStats() {
    return getProvinceStats();
  }
  
  getCommunes(provinceName: string) {
    return getProvinceCommunes(provinceName);
  }
  
  getMergedProvinces() {
    return NEW_34_PROVINCES.filter(p => p.merged_from && p.merged_from.length > 1);
  }
}`}
                />
            </section>

            <div className="flex justify-between pt-8 mt-8 border-t border-white/10">
                <a href="/docs/vue" className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">
                    ← Vue.js
                </a>
                <a href="/docs/vanilla" className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600">
                    Vanilla JS →
                </a>
            </div>
        </div>
    );
}
