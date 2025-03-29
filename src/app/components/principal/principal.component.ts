import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Declaramos la variable global anime
declare const anime: any;

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements AfterViewInit {
  @ViewChild('status') statusElement?: ElementRef;
  statusMessage = 'Ingresa una URL de PDF para comenzar';
  pdfUrl: string = '';
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.statusMessage = 'Visor de PDF listo';
    this.cdr.detectChanges();
  }

  loadPDF(): void {
    if (!this.pdfUrl) {
      this.statusMessage = 'Por favor, ingresa una URL de PDF';
      return;
    }

    if (!this.pdfUrl.toLowerCase().endsWith('.pdf')) {
      this.statusMessage = 'La URL debe terminar en .pdf';
      return;
    }

    this.statusMessage = 'Cargando PDF...';
    this.cdr.detectChanges();

    // Verificar si el PDF es accesible
    fetch(this.pdfUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          this.statusMessage = 'PDF cargado correctamente';
        } else {
          this.statusMessage = 'Error al cargar el PDF. Verifica la URL.';
        }
      })
      .catch(error => {
        this.statusMessage = 'Error al acceder al PDF. Verifica la URL y los permisos CORS.';
      })
      .finally(() => {
        this.cdr.detectChanges();
      });
  }

  setupInitialState(): void {
    console.log('Configurando estado inicial...');
    // Configurar los cuadrados en posición inicial
    anime({
      targets: '.square',
      translateX: (el: HTMLElement, i: number) => i * 20,
      translateY: (el: HTMLElement, i: number) => i * 20,
      scale: [0.8, 1],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutElastic(1, .8)'
    });
    
    // Configurar los círculos en posición inicial
    anime({
      targets: '.circle',
      scale: [0, 1],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutElastic(1, .8)'
    });
  }

  // Método para animar el SVG path con las iniciales SPIRIT
  animatePath(): void {
    this.statusMessage = 'Animando el trazado de SPIRIT...';
    
    // Reiniciar el path a su estado inicial si es necesario
    anime.set('#spirit-path', {
      strokeDashoffset: 2500,
      stroke: '#4A86E8'
    });
    
    // Animar el trazo del path
    const pathAnimation = anime.timeline({
      easing: 'easeInOutSine',
      complete: () => {
        this.statusMessage = 'Animación del trazado completada';
        this.cdr.detectChanges();
      }
    });
    
    // Primer paso: dibujar el trazo
    pathAnimation.add({
      targets: '#spirit-path',
      strokeDashoffset: [2500, 0],
      duration: 4000,
      easing: 'easeInOutQuad'
    });
    
    // Segundo paso: animar colores
    pathAnimation.add({
      targets: '#spirit-path',
      stroke: [
        { value: '#4A86E8', duration: 500 },
        { value: '#FF5722', duration: 500 },
        { value: '#8A2BE2', duration: 500 },
        { value: '#4A86E8', duration: 500 }
      ],
      strokeWidth: [
        { value: 8, duration: 300 },
        { value: 5, duration: 300 }
      ],
      easing: 'easeInOutQuad'
    });
    
    // Tercer paso: efecto de brillo
    pathAnimation.add({
      targets: '#spirit-path',
      filter: [
        { value: 'drop-shadow(0 0 8px rgba(74, 134, 232, 0.9))', duration: 500 },
        { value: 'drop-shadow(0 0 12px rgba(255, 87, 34, 0.9))', duration: 500 },
        { value: 'drop-shadow(0 0 8px rgba(138, 43, 226, 0.9))', duration: 500 },
        { value: 'drop-shadow(0 0 4px rgba(74, 134, 232, 0.8))', duration: 500 }
      ],
      easing: 'easeInOutQuad'
    });
  }

  playAnimation(): void {
    console.log('Reproduciendo animación...');
    this.statusMessage = 'Animación en curso...';
    
    // Animación para los cuadrados
    anime({
      targets: '.square',
      translateX: () => anime.random(-150, 150),
      translateY: () => anime.random(-150, 150),
      rotate: () => anime.random(-360, 360),
      scale: () => anime.random(0.5, 1.5),
      duration: 1500,
      delay: anime.stagger(50),
      easing: 'easeInOutQuad',
      complete: (anim: any) => {
        // Volver a la posición inicial con una animación inversa
        anime({
          targets: '.square',
          translateX: (el: HTMLElement, i: number) => i * 20,
          translateY: (el: HTMLElement, i: number) => i * 20,
          rotate: 0,
          scale: 1,
          duration: 1500,
          delay: anime.stagger(50),
          easing: 'easeOutElastic(1, .5)',
          complete: () => {
            this.statusMessage = 'Animación completada';
            this.cdr.detectChanges();
          }
        });
      }
    });

    // Animación para los círculos
    anime({
      targets: '.circle',
      translateY: [
        { value: -50, duration: 500, easing: 'easeOutSine' },
        { value: 0, duration: 500, easing: 'easeInOutQuad' }
      ],
      scale: [
        { value: 1.2, duration: 300, delay: anime.stagger(100) },
        { value: 1, duration: 300 }
      ],
      backgroundColor: [
        { value: '#FF5722', duration: 500 },
        { value: '#8A2BE2', duration: 500 }
      ],
      delay: anime.stagger(200),
      loop: 1
    });
  }
}
