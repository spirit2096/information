import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrimeNgModule } from '../../modules/prime-ng/prime-ng.module';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface InfoCard {
  id: number;
  title: string;
  content: string;
  icon: string;
  link?: string;
  visible: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PrimeNgModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('cardAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.8)',
        visibility: 'hidden'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)',
        visibility: 'visible'
      })),
      transition('hidden => visible', [
        animate('0.5s ease-out')
      ]),
      transition('visible => hidden', [
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export default class DashboardComponent implements OnInit, AfterViewInit {

  infoCards: InfoCard[] = [
    {
      id: 1,
      title: 'GitHub',
      content: 'Mi repositorio de proyectos y contribuciones',
      icon: 'pi pi-github',
      link: 'https://github.com/spirit2096',
      visible: false
    },
    {
      id: 2,
      title: 'Reconocimiento',
      content: 'Certificaciones y logros profesionales',
      icon: 'pi pi-trophy',
      link: '/reconocimiento',
      visible: false
    },
    {
      id: 3,
      title: 'Artículo de Investigación',
      content: 'Publicación sobre el sistema web desarrollado durante la maestria',
      icon: 'pi pi-file-pdf',
      link: 'https://revista-agroproductividad.org/index.php/agroproductividad/article/view/1937',
      visible: false
    },
    {
      id: 4,
      title: 'Entrevista',
      content: 'Entrevista para Terranos conCiencia',
      icon: 'pi pi-video',
      link: 'https://www.youtube.com/watch?v=3wQfcueKy4k',
      visible: false
    },
    {
      id: 5,
      title: 'Ultimo Empleo',
      content: 'Empresa: JOBTY TECNOLOGÍA S.A.S',
      icon: 'pi pi-briefcase',
      link: 'https://www.jobty.app/',
      visible: false
    }
  ];

  ngOnInit(): void {
    // Mostrar todas las cards al inicializar
    this.infoCards.forEach(card => card.visible = true);
  }

  @ViewChild('canvasContainer', { static: false }) canvasRef!: ElementRef;

  ngAfterViewInit(): void {
    const container = this.canvasRef.nativeElement;

    const scene = new THREE.Scene();

    // Configurar fondo sólido más claro
    scene.background = new THREE.Color(0x2a2a2a);
    
    const camera = new THREE.PerspectiveCamera(
      100,
      container.clientWidth / container.clientHeight,
      0.2,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    scene.add(light);

    // ✅ Agrega OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;

    let model: THREE.Group | undefined;
    let rotationSpeed = 0.0009; // Velocidad de rotación lenta

    const loader = new GLTFLoader();
    loader.load('assets/models/scene.gltf', (gltf) => {
      model = gltf.scene;
      // Hacer la figura más grande
      model.scale.set(2, 2, 2);
      model.position.y = -3;
      scene.add(model);
      animate();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotación automática lenta
      if (model) {
        model.rotation.y += rotationSpeed;
        
        // La figura gira automáticamente
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
  }

  onCardClick(card: InfoCard): void {
    if (card.link) {
      window.open(card.link, '_blank');
    }
  }
}
