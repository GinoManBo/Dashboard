import { useState, useRef } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = 'panel' | 'postulaciones' | 'practicas' | 'historial' | 'consultorio' | 'formulario' | 'abogadoDash' | 'practicanteDash'

// ─── Data ────────────────────────────────────────────────────────────────────
const abogados = [
  { id: 1, ini: 'CM', nombre: 'Carlos Muñoz Sepúlveda', area: 'Derecho Civil', activos: 3, historicos: 12, color: '#5b7fd4' },
  { id: 2, ini: 'AR', nombre: 'Andrea Rojas Fuentes', area: 'Derecho Penal', activos: 2, historicos: 9, color: '#27ae60' },
  { id: 3, ini: 'FC', nombre: 'Felipe Contreras Vidal', area: 'Derecho Laboral', activos: 2, historicos: 7, color: '#e67e22' },
  { id: 4, ini: 'ME', nombre: 'Marcela Espinoza Torres', area: 'Derecho de Familia', activos: 2, historicos: 11, color: '#8e6dbf' },
  { id: 5, ini: 'RS', nombre: 'Roberto Sánchez Aravena', area: 'Derecho Civil', activos: 1, historicos: 8, color: '#2980b9' },
  { id: 6, ini: 'LF', nombre: 'Lorena Figueroa Mella', area: 'Derecho Penal', activos: 1, historicos: 6, color: '#9b59b6' },
  { id: 7, ini: 'PH', nombre: 'Patricio Henríquez Castro', area: 'Derecho Laboral', activos: 1, historicos: 5, color: '#3498db' },
  { id: 8, ini: 'CD', nombre: 'Carolina Díaz Poblete', area: 'Derecho de Familia', activos: 0, historicos: 4, color: '#c0392b' },
]

const consultorios = [
  { id: 1, nombre: 'Consultorio Centro — Concepción', direccion: 'O\'Higgins 440, piso 3, Concepción', practicantes: 4, capacidad: 6, color: '#2980b9' },
  { id: 2, nombre: 'Consultorio Talcahuano', direccion: 'Colón 1262, Talcahuano', practicantes: 2, capacidad: 4, color: '#27ae60' },
  { id: 3, nombre: 'Consultorio San Pedro de la Paz', direccion: 'Av. Gran Bretaña 3035, San Pedro', practicantes: 2, capacidad: 4, color: '#8e6dbf' },
  { id: 4, nombre: 'Consultorio Los Ángeles', direccion: 'Caupolicán 380, Los Ángeles', practicantes: 1, capacidad: 3, color: '#e67e22' },
  { id: 5, nombre: 'Consultorio Chillán', direccion: 'Arauco 584, Chillán', practicantes: 2, capacidad: 3, color: '#16a085' },
  { id: 6, nombre: 'Consultorio Coronel', direccion: 'Manuel Rodríguez 481, Coronel', practicantes: 1, capacidad: 2, color: '#c0392b' },
]

const postulaciones = [
  { id: 1, ini: 'PV', nombre: 'Paula Villanueva Cortés', rut: '20.456.789-1', universidad: 'U. de Concepción', año: '5°', email: 'paula.villanueva@udec.cl', tel: '+56 9 8765 4321', fecha: '22/07/2026', color: '#5b7fd4', estado: 'pendiente' },
  { id: 2, ini: 'RM', nombre: 'Ricardo Mendoza Jara', rut: '21.234.567-8', universidad: 'U. del Bío-Bío', año: 'Egresado', email: 'r.mendoza@ubiobio.cl', tel: '+56 9 1122 3344', fecha: '21/07/2026', color: '#27ae60', estado: 'pendiente' },
  { id: 3, ini: 'MF', nombre: 'Martín Fuentes Oliva', rut: '20.876.543-2', universidad: 'UCSC', año: '5°', email: 'm.fuentes@ucsc.cl', tel: '+56 9 5566 7788', fecha: '19/07/2026', color: '#9b59b6', estado: 'pendiente' },
]

const practicas = [
  { id: 1, practicante: 'Catalina Vera Muñoz', universidad: 'U. de Concepción', inicio: '01/03/2026', termino: '31/08/2026', abogado: 'Carlos Muñoz S.', abogadoIni: 'CM', abogadoColor: '#5b7fd4', estado: 'Activa', uniColor: '#2980b9', consultorio: 'Centro — Concepción', tel: '+56 9 7654 3210', email: 'c.vera@udec.cl', discapacidad: 'Ninguna' },
  { id: 2, practicante: 'Andrés Riquelme Soto', universidad: 'U. del Bío-Bío', inicio: '15/03/2026', termino: '15/09/2026', abogado: 'Andrea Rojas F.', abogadoIni: 'AR', abogadoColor: '#27ae60', estado: 'Activa', uniColor: '#e67e22', consultorio: 'Talcahuano', tel: '+56 9 8877 6655', email: 'a.riquelme@ubb.cl', discapacidad: 'Ninguna' },
  { id: 3, practicante: 'Fernanda Lagos Parra', universidad: 'UCSC', inicio: '01/04/2026', termino: '30/09/2026', abogado: 'Felipe Contreras V.', abogadoIni: 'FC', abogadoColor: '#e67e22', estado: 'Activa', uniColor: '#8e6dbf', consultorio: 'Centro — Concepción', tel: '+56 9 9988 1122', email: 'f.lagos@ucsc.cl', discapacidad: 'Ninguna' },
  { id: 4, practicante: 'Diego Fuentes Alarcón', universidad: 'U. de Concepción', inicio: '01/07/2026', termino: '31/12/2026', abogado: 'Marcela Espinoza T.', abogadoIni: 'ME', abogadoColor: '#8e6dbf', estado: 'Por iniciar', uniColor: '#2980b9', consultorio: 'San Pedro de la Paz', tel: '+56 9 6655 4433', email: 'd.fuentes@udec.cl', discapacidad: 'Ninguna' },
  { id: 5, practicante: 'Javiera Monsalve Reyes', universidad: 'U. San Sebastián', inicio: '01/01/2026', termino: '30/07/2026', abogado: 'Roberto Sánchez A.', abogadoIni: 'RS', abogadoColor: '#2980b9', estado: 'Por terminar', uniColor: '#c0392b', consultorio: 'Centro — Concepción', tel: '+56 9 5544 3322', email: 'j.monsalve@uss.cl', discapacidad: 'Hipoacusia leve' },
  { id: 6, practicante: 'Tomás Sepúlveda Ortiz', universidad: 'U. del Bío-Bío', inicio: '15/04/2026', termino: '15/10/2026', abogado: 'Lorena Figueroa M.', abogadoIni: 'LF', abogadoColor: '#9b59b6', estado: 'Activa', uniColor: '#e67e22', consultorio: 'Talcahuano', tel: '+56 9 3322 1100', email: 't.sepulveda@ubb.cl', discapacidad: 'Ninguna' },
]

const historial = [
  { id: 1, practicante: 'Macarena Soto Pizarro', universidad: 'U. de Concepción', periodo: '01/01/2026 – 30/06/2026', abogado: 'Carlos Muñoz S.', abogadoIni: 'CM', abogadoColor: '#5b7fd4', uniColor: '#2980b9' },
  { id: 2, practicante: 'Sebastián Mora Acuña', universidad: 'U. del Bío-Bío', periodo: '01/01/2026 – 30/06/2026', abogado: 'Andrea Rojas F.', abogadoIni: 'AR', abogadoColor: '#27ae60', uniColor: '#e67e22' },
  { id: 3, practicante: 'Valentina Cuevas Roa', universidad: 'UCSC', periodo: '01/08/2025 – 31/01/2026', abogado: 'Felipe Contreras V.', abogadoIni: 'FC', abogadoColor: '#e67e22', uniColor: '#8e6dbf' },
  { id: 4, practicante: 'Nicolás Bravo Herrera', universidad: 'U. San Sebastián', periodo: '01/08/2025 – 31/01/2026', abogado: 'Marcela Espinoza T.', abogadoIni: 'ME', abogadoColor: '#8e6dbf', uniColor: '#c0392b' },
]

const navItems: { id: Page; label: string; icon: string; badge?: number }[] = [
  { id: 'panel', label: 'Panel General', icon: 'grid' },
  { id: 'postulaciones', label: 'Postulaciones', icon: 'doc', badge: 3 },
  { id: 'practicas', label: 'Prácticas Activas', icon: 'calendar' },
  { id: 'historial', label: 'Historial', icon: 'clock' },
  { id: 'consultorio', label: 'Consultorios', icon: 'building' },
]

const practicanteData = {
  nombre: 'Catalina Vera Muñoz',
  universidad: 'Universidad de Concepción',
  consultorio: 'Consultorio Centro — Concepción',
  abogado: 'Carlos Muñoz Sepúlveda',
  abogadoEmail: 'carlos.munoz@cajbiobio.cl',
  abogadoTelefono: '+56 9 7654 3210',
  inicio: '01/03/2026',
  termino: '31/08/2026',
  estado: 'Activa',
  calificaciones: [
    { mes: 'Marzo', nota: '7.8', detalle: 'Desempeño inicial adecuado' },
    { mes: 'Abril', nota: '8.1', detalle: 'Ha mejorado su organización' },
    { mes: 'Mayo', nota: '8.4', detalle: 'Excelente compromiso y asistencia' },
  ],
  partes: [
    { nombre: 'Sra. Ana María Pérez', rol: 'Parte demandante', estado: 'Disconforme con la estrategia', detalle: 'Solicita mayor claridad en los plazos del proceso.', instancia: 'Primera instancia', corte: 'Corte de Apelaciones de Concepción' },
    { nombre: 'Sr. Luis Gutiérrez', rol: 'Parte demandada', estado: 'Requiere información adicional', detalle: 'Solicita actualización del estado del caso.', instancia: 'Segunda instancia', corte: 'Corte de Apelaciones de Concepción' },
  ],
  mensajes: [
    { id: 1, remitente: 'abogado', texto: 'Hola Catalina, recuerda revisar el expediente del caso de familia antes de la reunión de mañana.' },
    { id: 2, remitente: 'practicante', texto: 'Perfecto, lo revisaré esta tarde y te entrego mis observaciones.' },
  ],
}

const audiencias = [
  { fecha: '05/08/2026', tipo: 'Preparatoria', ambito: 'Derecho de Familia', detalle: 'Revisión de antecedentes y agenda de prueba.' },
  { fecha: '12/08/2026', tipo: 'Juicio', ambito: 'Derecho Civil', detalle: 'Audiencia de conciliación y exposición de argumentos.' },
]

// ─── Icons ───────────────────────────────────────────────────────────────────
function Icon({ name, size = 16 }: { name: string; size?: number }) {
  const s = size
  const icons: Record<string, JSX.Element> = {
    grid: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    doc: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    calendar: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    clock: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    users: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    building: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15"/><polyline points="16 7 16 3 8 3 8 7"/><line x1="12" y1="22" x2="12" y2="7"/></svg>,
    search: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    chevron_left: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    chevron_right: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    eye: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    edit: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    check: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    upload: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    arrow_right: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    x: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    user_plus: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
    bell: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    alert: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><triangle/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    star: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    map_pin: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    phone: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.82-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    mail: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    heart: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    clipboard: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
    send: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    info: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    message: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  }
  return icons[name] || <span />
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ ini, color, size = 36 }: { ini: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: size * 0.36, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>
      {ini}
    </div>
  )
}

function StatusBadge({ estado }: { estado: string }) {
  const map: Record<string, { bg: string; color: string; dot: string }> = {
    'Activa': { bg: '#e8f5e9', color: '#2e7d32', dot: '#27ae60' },
    'Por iniciar': { bg: '#fff3e0', color: '#e65100', dot: '#e67e22' },
    'Por terminar': { bg: '#fff8e1', color: '#f57f17', dot: '#f39c12' },
    'Finalizada': { bg: '#e3f2fd', color: '#1565c0', dot: '#2980b9' },
  }
  const s = map[estado] || { bg: '#f5f5f5', color: '#555', dot: '#aaa' }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, background: s.bg, color: s.color, fontSize: 12, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {estado}
    </span>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <aside style={{ width: 220, background: '#1a2744', display: 'flex', flexDirection: 'column', minHeight: '100vh', flexShrink: 0, position: 'relative' }}>
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, background: '#c0392b', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 10, fontWeight: 700, lineHeight: 1.3 }}>Corporación de<br/>Asistencia Judicial</div>
            <div style={{ color: '#c0392b', fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', marginTop: 1 }}>BIOBÍO</div>
          </div>
        </div>
      </div>
      <nav style={{ padding: '16px 10px', flex: 1 }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '0 8px', marginBottom: 8 }}>PRINCIPAL</div>
        {navItems.map(item => {
          const active = page === item.id
          return (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: active ? 'rgba(255,255,255,0.12)' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.65)', fontSize: 13.5, fontWeight: active ? 600 : 400, marginBottom: 2, transition: 'all 0.15s', textAlign: 'left', position: 'relative' }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {active && <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 28, background: '#c0392b', borderRadius: '0 2px 2px 0' }} />}
              <Icon name={item.icon} size={15} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && <span style={{ background: '#c0392b', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{item.badge}</span>}
            </button>
          )
        })}

        <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '0 8px', marginBottom: 8 }}>ACCESO RÁPIDO</div>
          <button onClick={() => setPage('abogadoDash')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: page === 'abogadoDash' ? 'rgba(255,255,255,0.12)' : 'transparent', color: page === 'abogadoDash' ? '#fff' : 'rgba(255,255,255,0.65)', fontSize: 13.5, fontWeight: page === 'abogadoDash' ? 600 : 400, transition: 'all 0.15s', textAlign: 'left', position: 'relative' }}
            onMouseEnter={e => { if (page !== 'abogadoDash') (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { if (page !== 'abogadoDash') (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            {page === 'abogadoDash' && <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 28, background: '#c0392b', borderRadius: '0 2px 2px 0' }} />}
            <Icon name="users" size={15} />
            <span style={{ flex: 1 }}>Vista Abogado</span>
          </button>
          <button onClick={() => setPage('practicanteDash')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', background: page === 'practicanteDash' ? 'rgba(255,255,255,0.12)' : 'transparent', color: page === 'practicanteDash' ? '#fff' : 'rgba(255,255,255,0.65)', fontSize: 13.5, fontWeight: page === 'practicanteDash' ? 600 : 400, transition: 'all 0.15s', textAlign: 'left', position: 'relative', marginTop: 4 }}
            onMouseEnter={e => { if (page !== 'practicanteDash') (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { if (page !== 'practicanteDash') (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            {page === 'practicanteDash' && <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 28, background: '#c0392b', borderRadius: '0 2px 2px 0' }} />}
            <Icon name="user_plus" size={15} />
            <span style={{ flex: 1 }}>Vista Practicante</span>
          </button>
        </div>
      </nav>
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, lineHeight: 1.5 }}>Ministerio de Justicia<br/>y Derechos Humanos</div>
      </div>
    </aside>
  )
}

function Header({ title, notifCount = 0, onNotif }: { title: string; notifCount?: number; onNotif?: () => void }) {
  return (
    <header style={{ background: '#1a2744', borderBottom: '3px solid #c0392b', padding: '0 28px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{title}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onNotif && (
          <button onClick={onNotif} style={{ position: 'relative', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', width: 36, height: 36, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="bell" size={17} />
            {notifCount > 0 && <span style={{ position: 'absolute', top: 6, right: 7, width: 8, height: 8, background: '#c0392b', borderRadius: '50%', border: '1.5px solid #1a2744' }} />}
          </button>
        )}
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Admin / Asistente</span>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>AD</div>
      </div>
    </header>
  )
}

function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span style={{ color: '#adb5bd', fontSize: 12 }}>/</span>}
          <span style={{ color: i === items.length - 1 ? '#c0392b' : '#6c757d', fontSize: 12.5 }}>{item}</span>
        </span>
      ))}
    </div>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e9ecef', padding: 20, ...style }}>
      {children}
    </div>
  )
}

// ─── Panel General ───────────────────────────────────────────────────────────
function PanelGeneral({ setPage }: { setPage: (p: Page) => void }) {
  const stats = [
    { label: 'POSTULACIONES PENDIENTES', value: 3, sub: 'Por revisar', icon: 'doc', color: '#2980b9', bg: '#e8f4fd' },
    { label: 'PRÁCTICAS ACTIVAS', value: 12, sub: 'En curso', icon: 'check', color: '#27ae60', bg: '#e8f5e9' },
    { label: 'POR TERMINAR', value: 3, sub: 'Próximos 30 días', icon: 'calendar', color: '#e67e22', bg: '#fff3e0' },
  ]
  return (
    <div style={{ padding: '28px 28px 40px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a2744', margin: 0 }}>Panel General</h1>
      <Breadcrumb items={['Inicio', 'Panel General']} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
        {stats.map((s, i) => (
          <Card key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}><Icon name={s.icon} size={22} /></div>
            <div>
              <div style={{ color: '#6c757d', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em' }}>{s.label}</div>
              <div style={{ color: '#1a2744', fontSize: 32, fontWeight: 700, lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ color: '#adb5bd', fontSize: 12 }}>{s.sub}</div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="doc" size={15} /><span style={{ fontWeight: 600, color: '#1a2744', fontSize: 14 }}>Últimas postulaciones</span></div>
            <button onClick={() => setPage('postulaciones')} style={{ border: 'none', background: '#f1f3f5', color: '#495057', fontSize: 12, padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>Ver todas</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {postulaciones.slice(0, 2).map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#f8f9fa', borderRadius: 8 }}>
                <Avatar ini={p.ini} color={p.color} size={34} />
                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, color: '#1a2744', fontSize: 13.5 }}>{p.nombre}</div><div style={{ color: '#6c757d', fontSize: 12 }}>{p.universidad} · {p.año} año</div></div>
                <span style={{ color: '#adb5bd', fontSize: 12 }}>{p.id === 1 ? 'Hoy' : 'Ayer'}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="clock" size={15} /><span style={{ fontWeight: 600, color: '#1a2744', fontSize: 14 }}>Prácticas por terminar</span></div>
            <button onClick={() => setPage('practicas')} style={{ border: 'none', background: '#f1f3f5', color: '#495057', fontSize: 12, padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>Ver todas</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { ini: 'JM', nombre: 'Javiera Monsalve Reyes', tutor: 'Roberto Sánchez A.', fecha: '30/07', color: '#e67e22' },
              { ini: 'IS', nombre: 'Ignacio Soto Bravo', tutor: 'Marcela Espinoza T.', fecha: '15/08', color: '#27ae60' },
              { ini: 'CA', nombre: 'Camila Aravena Paz', tutor: 'Felipe Contreras V.', fecha: '20/08', color: '#3498db' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#f8f9fa', borderRadius: 8 }}>
                <Avatar ini={p.ini} color={p.color} size={34} />
                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, color: '#1a2744', fontSize: 13.5 }}>{p.nombre}</div><div style={{ color: '#6c757d', fontSize: 12 }}>Tutor: {p.tutor}</div></div>
                <span style={{ color: '#c0392b', fontWeight: 600, fontSize: 12 }}>Termina {p.fecha}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─── Postulaciones ────────────────────────────────────────────────────────────
function Postulaciones() {
  const [items, setItems] = useState(postulaciones)
  return (
    <div style={{ padding: '28px 28px 40px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a2744', margin: 0 }}>Postulaciones</h1>
      <Breadcrumb items={['Inicio', 'Postulaciones pendientes']} />
      <Card style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="doc" size={15} /><span style={{ fontWeight: 600, color: '#1a2744', fontSize: 15 }}>Postulaciones por revisar</span></div>
          <span style={{ color: '#6c757d', fontSize: 13 }}>{items.length} pendientes</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#adb5bd', fontSize: 14 }}>No hay postulaciones pendientes</div>}
          {items.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#f8f9fa', borderRadius: 9, border: '1px solid #f1f3f5' }}>
              <Avatar ini={p.ini} color={p.color} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 14.5 }}>{p.nombre}</div>
                <div style={{ color: '#495057', fontSize: 12.5, marginTop: 2 }}><span style={{ fontWeight: 600 }}>RUT:</span> {p.rut} &nbsp;<span style={{ fontWeight: 600 }}>Universidad:</span> {p.universidad} &nbsp;<span style={{ fontWeight: 600 }}>Año:</span> {p.año}</div>
                <div style={{ color: '#6c757d', fontSize: 12, marginTop: 2 }}>{p.email} &nbsp; {p.tel}</div>
              </div>
              <span style={{ color: '#adb5bd', fontSize: 12, marginRight: 12 }}>{p.fecha}</span>
              <button onClick={() => setItems(prev => prev.filter(x => x.id !== p.id))} style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '7px 16px', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Aceptar</button>
              <button onClick={() => setItems(prev => prev.filter(x => x.id !== p.id))} style={{ background: '#fff', color: '#c0392b', border: '1.5px solid #c0392b', padding: '7px 16px', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Rechazar</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─── Prácticas Activas ────────────────────────────────────────────────────────
function PracticasActivas() {
  const [search, setSearch] = useState('')
  const filtered = practicas.filter(p => p.practicante.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ padding: '28px 28px 40px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a2744', margin: 0 }}>Prácticas Activas</h1>
      <Breadcrumb items={['Inicio', 'Prácticas Activas']} />
      <Card style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e3f2fd', color: '#1565c0', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Cupos disponibles: 3</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f8f9fa', color: '#495057', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>Total de cupos: 15</span>
          </div>
          <button style={{ border: 'none', background: '#1a2744', color: '#fff', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Agregar cupos</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="calendar" size={15} /><span style={{ fontWeight: 600, color: '#1a2744', fontSize: 15 }}>Prácticas en curso</span></div>
            <span style={{ color: '#6c757d', fontSize: 13, maxWidth: 540 }}>Cuando hayan cupos disponibles se lo dará al próximo practicante en la lista.</span>
          </div>
          <span style={{ color: '#6c757d', fontSize: 13 }}>{filtered.length} registros</span>
        </div>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' }}><Icon name="search" size={15} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar practicante..." style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none', color: '#495057', background: '#f8f9fa' }} />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f3f5' }}>
                {['PRACTICANTE', 'UNIVERSIDAD', 'INICIO', 'TÉRMINO', 'ABOGADO TUTOR', 'CONSULTORIO', 'ESTADO', ''].map((h, i) => (
                  <th key={i} style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f3f5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.uniColor, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: '#1a2744' }}>{p.practicante}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px', color: '#495057' }}>{p.universidad}</td>
                  <td style={{ padding: '12px 12px', color: '#495057' }}>{p.inicio}</td>
                  <td style={{ padding: '12px 12px', color: '#495057' }}>{p.termino}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar ini={p.abogadoIni} color={p.abogadoColor} size={26} /><span style={{ color: '#495057' }}>{p.abogado}</span></div>
                  </td>
                  <td style={{ padding: '12px 12px', color: '#6c757d', fontSize: 12 }}>{p.consultorio}</td>
                  <td style={{ padding: '12px 12px' }}><StatusBadge estado={p.estado} /></td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ border: 'none', background: '#f1f3f5', color: '#6c757d', width: 28, height: 28, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="eye" size={13} /></button>
                      <button style={{ border: 'none', background: '#f1f3f5', color: '#6c757d', width: 28, height: 28, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="edit" size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <span style={{ color: '#6c757d', fontSize: 12.5 }}>Mostrando 1-{filtered.length} de {practicas.length} prácticas</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2].map(n => (<button key={n} style={{ width: 30, height: 30, border: n === 1 ? 'none' : '1px solid #dee2e6', background: n === 1 ? '#1a2744' : '#fff', color: n === 1 ? '#fff' : '#495057', borderRadius: 6, fontWeight: n === 1 ? 700 : 400, fontSize: 13, cursor: 'pointer' }}>{n}</button>))}
            <button style={{ width: 30, height: 30, border: '1px solid #dee2e6', background: '#fff', color: '#495057', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="chevron_right" size={14} /></button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ─── Historial ────────────────────────────────────────────────────────────────
function Historial() {
  const [search, setSearch] = useState('')
  const filtered = historial.filter(p => p.practicante.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ padding: '28px 28px 40px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a2744', margin: 0 }}>Historial</h1>
      <Breadcrumb items={['Inicio', 'Historial de prácticas']} />
      <Card style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="clock" size={15} /><span style={{ fontWeight: 600, color: '#1a2744', fontSize: 15 }}>Prácticas finalizadas</span></div>
          <span style={{ color: '#6c757d', fontSize: 13 }}>24 registros</span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' }}><Icon name="search" size={15} /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar en historial..." style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none', color: '#495057', background: '#f8f9fa' }} />
          </div>
          <select style={{ border: '1.5px solid #dee2e6', borderRadius: 8, padding: '0 12px', fontSize: 13, color: '#495057', background: '#f8f9fa', outline: 'none' }}>
            <option>2026</option><option>2025</option><option>2024</option>
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f3f5' }}>
              {['PRACTICANTE', 'UNIVERSIDAD', 'PERIODO', 'ABOGADO TUTOR', 'ESTADO'].map((h, i) => (
                <th key={i} style={{ textAlign: 'left', padding: '8px 12px', color: '#6c757d', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f3f5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '13px 12px', fontWeight: 700, color: '#1a2744' }}>{p.practicante}</td>
                <td style={{ padding: '13px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: p.uniColor, flexShrink: 0 }} /><span style={{ color: '#495057' }}>{p.universidad}</span></div>
                </td>
                <td style={{ padding: '13px 12px', color: '#495057' }}>{p.periodo}</td>
                <td style={{ padding: '13px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar ini={p.abogadoIni} color={p.abogadoColor} size={26} /><span style={{ color: '#495057' }}>{p.abogado}</span></div>
                </td>
                <td style={{ padding: '13px 12px' }}><StatusBadge estado="Finalizada" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <span style={{ color: '#6c757d', fontSize: 12.5 }}>Mostrando 1-{filtered.length} de 24</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3].map(n => (<button key={n} style={{ width: 30, height: 30, border: n === 1 ? 'none' : '1px solid #dee2e6', background: n === 1 ? '#1a2744' : '#fff', color: n === 1 ? '#fff' : '#495057', borderRadius: 6, fontWeight: n === 1 ? 700 : 400, fontSize: 13, cursor: 'pointer' }}>{n}</button>))}
            <button style={{ width: 30, height: 30, border: '1px solid #dee2e6', background: '#fff', color: '#495057', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="chevron_right" size={14} /></button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ─── Consultorios ─────────────────────────────────────────────────────────────
function Consultorios() {
  const [selected, setSelected] = useState<typeof consultorios[0] | null>(null)

  const practicantesDelConsultorio = (nombre: string) =>
    practicas.filter(p => p.consultorio.includes(nombre.split('—')[1]?.trim() || nombre.split(' ')[1] || nombre))

  return (
    <div style={{ padding: '28px 28px 40px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a2744', margin: 0 }}>Consultorios</h1>
      <Breadcrumb items={['Inicio', 'Consultorios disponibles']} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
        {consultorios.map(c => {
          const pct = (c.practicantes / c.capacidad) * 100
          const isSelected = selected?.id === c.id
          return (
            <div key={c.id} onClick={() => setSelected(isSelected ? null : c)}
              style={{ background: '#fff', borderRadius: 12, border: `2px solid ${isSelected ? c.color : '#e9ecef'}`, padding: '22px 20px', cursor: 'pointer', transition: 'all 0.15s', boxShadow: isSelected ? `0 4px 16px ${c.color}28` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
                  <Icon name="building" size={20} />
                </div>
                <span style={{ background: pct >= 80 ? '#fff3e0' : '#e8f5e9', color: pct >= 80 ? '#e65100' : '#2e7d32', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>
                  {c.practicantes}/{c.capacidad} cupos
                </span>
              </div>
              <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 14, lineHeight: 1.3, marginBottom: 6 }}>{c.nombre}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6c757d', fontSize: 12, marginBottom: 14 }}>
                <Icon name="map_pin" size={12} />
                <span>{c.direccion}</span>
              </div>
              {/* Progress bar */}
              <div style={{ background: '#f1f3f5', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? '#e67e22' : c.color, borderRadius: 4, transition: 'width 0.3s' }} />
              </div>
              <div style={{ color: '#adb5bd', fontSize: 11, marginTop: 6 }}>{Math.round(pct)}% de capacidad utilizada</div>
            </div>
          )
        })}
      </div>

      {/* Detail */}
      {selected && (
        <Card style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${selected.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected.color }}><Icon name="building" size={24} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#1a2744' }}>{selected.nombre}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6c757d', fontSize: 13, marginTop: 3 }}><Icon name="map_pin" size={13} />{selected.direccion}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <span style={{ background: '#e8f4fd', color: '#1565c0', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{selected.practicantes} practicantes activos</span>
                  <span style={{ background: '#f1f3f5', color: '#495057', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{selected.capacidad - selected.practicantes} cupos disponibles</span>
                </div>
              </div>
            </div>
            <button onClick={() => setSelected(null)} style={{ border: 'none', background: '#f1f3f5', color: '#6c757d', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={14} /></button>
          </div>
          <div style={{ borderTop: '1px solid #f1f3f5', paddingTop: 16 }}>
            <div style={{ color: '#6c757d', fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 12 }}>PRACTICANTES ASIGNADOS</div>
            {practicas.filter(p => p.consultorio.toLowerCase().includes(selected.nombre.toLowerCase().split('—')[1]?.trim().split(' ')[0].toLowerCase() || selected.nombre.split(' ')[1]?.toLowerCase() || '')).length === 0 ? (
              <div style={{ color: '#adb5bd', textAlign: 'center', padding: '20px 0', fontSize: 13 }}>Sin practicantes asignados actualmente</div>
            ) : (
              practicas.filter(p => {
                const keyword = selected.nombre.includes('—') ? selected.nombre.split('—')[1]?.trim() : selected.nombre.split(' ')[1]
                return p.consultorio.toLowerCase().includes((keyword || selected.nombre).toLowerCase())
              }).map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#f8f9fa', borderRadius: 8, marginBottom: 8 }}>
                  <Avatar ini={p.practicante.split(' ').map(n => n[0]).join('').slice(0, 2)} color={p.uniColor} size={34} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#1a2744', fontSize: 13.5 }}>{p.practicante}</div>
                    <div style={{ color: '#6c757d', fontSize: 12 }}>{p.universidad} · Tutor: {p.abogado}</div>
                  </div>
                  <StatusBadge estado={p.estado} />
                  <span style={{ color: '#adb5bd', fontSize: 12 }}>Termina {p.termino}</span>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── Dashboard Practicante ────────────────────────────────────────────────
function DashboardPracticante() {
  const [messages, setMessages] = useState(practicanteData.mensajes)
  const [draft, setDraft] = useState('')
  const [selectedParte, setSelectedParte] = useState(0)
  const [minutaFileName, setMinutaFileName] = useState('')
  const minutaInputRef = useRef<HTMLInputElement>(null)

  const sendMessage = () => {
    if (!draft.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), remitente: 'practicante', texto: draft.trim() }])
    setDraft('')
  }

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a2744', margin: 0 }}>{practicanteData.nombre}</h1>
          <div style={{ color: '#6c757d', fontSize: 13.5, marginTop: 3 }}>{practicanteData.universidad} · Practicante</div>
          <Breadcrumb items={['Inicio', 'Vista Practicante', practicanteData.nombre]} />
        </div>
        <div style={{ background: '#fff', border: '1.5px solid #e9ecef', borderRadius: 10, padding: '10px 14px', color: '#495057', fontWeight: 600, fontSize: 13 }}>
          <StatusBadge estado={practicanteData.estado} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="calendar" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Detalle de la práctica</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { icon: 'building', label: 'Consultorio asignado', value: practicanteData.consultorio },
                { icon: 'users', label: 'Abogado tutor', value: practicanteData.abogado },
                { icon: 'mail', label: 'Correo', value: practicanteData.abogadoEmail },
                { icon: 'phone', label: 'Teléfono', value: practicanteData.abogadoTelefono },
              ].map((item, i) => (
                <div key={i} style={{ background: '#f8f9fa', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6c757d', fontSize: 11.5, fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em' }}>
                    <Icon name={item.icon} size={12} />
                    {item.label.toUpperCase()}
                  </div>
                  <div style={{ color: '#1a2744', fontSize: 13.5, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <div style={{ background: '#e8f4fd', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ color: '#2980b9', fontSize: 11.5, fontWeight: 700, marginBottom: 4 }}>FECHA DE INICIO</div>
                <div style={{ color: '#1a2744', fontSize: 13.5, fontWeight: 600 }}>{practicanteData.inicio}</div>
              </div>
              <div style={{ background: '#fff3e0', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ color: '#e67e22', fontSize: 11.5, fontWeight: 700, marginBottom: 4 }}>FECHA DE TÉRMINO</div>
                <div style={{ color: '#1a2744', fontSize: 13.5, fontWeight: 600 }}>{practicanteData.termino}</div>
              </div>
            </div>
          </Card>

          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="clipboard" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Calificaciones mensuales</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {practicanteData.calificaciones.map(item => (
                <div key={item.mes} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#f8f9fa', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 13 }}>{item.mes}</div>
                    <div style={{ color: '#6c757d', fontSize: 12, marginTop: 2 }}>{item.detalle}</div>
                  </div>
                  <div style={{ background: '#1a2744', color: '#fff', fontWeight: 700, padding: '7px 12px', borderRadius: 8, minWidth: 54, textAlign: 'center' }}>{item.nota}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="calendar" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Próximas audiencias</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {audiencias.map((audiencia, i) => (
                <div key={i} style={{ background: '#f8f9fa', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 13 }}>{audiencia.fecha} · {audiencia.tipo}</div>
                  <div style={{ color: '#6c757d', fontSize: 12, marginTop: 2 }}>Ámbito: {audiencia.ambito}</div>
                  <div style={{ color: '#495057', fontSize: 12.5, marginTop: 4 }}>{audiencia.detalle}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="message" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Chat con el abogado titular</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.remitente === 'practicante' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '80%', background: msg.remitente === 'practicante' ? '#1a2744' : '#f1f3f5', color: msg.remitente === 'practicante' ? '#fff' : '#1a2744', padding: '10px 12px', borderRadius: 10, fontSize: 12.5, lineHeight: 1.5 }}>
                    {msg.texto}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Escribe un mensaje..." style={{ flex: 1, padding: '9px 12px', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13, outline: 'none' }} />
              <button onClick={sendMessage} style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="send" size={15} /></button>
            </div>
          </Card>

          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="clipboard" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Minutas</span>
            </div>
            <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '12px 14px', marginBottom: 10 }}>
              <div style={{ fontWeight: 600, color: '#1a2744', fontSize: 13, marginBottom: 6 }}>Subir minuta de audiencia</div>
              <div onClick={() => minutaInputRef.current?.click()} style={{ border: '1.5px dashed #ced4da', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', color: '#6c757d', fontSize: 13 }}>
                <span>{minutaFileName || 'Adjuntar archivo PDF o Word'}</span>
                <Icon name="upload" size={15} />
              </div>
              <input ref={minutaInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setMinutaFileName(e.target.files?.[0]?.name || '')} />
            </div>
            <div style={{ color: '#495057', fontSize: 12.5, lineHeight: 1.6 }}>El practicante debe adjuntar la minuta correspondiente a la audiencia realizada, con el resumen de los hechos, acuerdos y observaciones relevantes.</div>
          </Card>

          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="info" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Partes involucradas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {practicanteData.partes.map((parte, i) => {
                const isActive = selectedParte === i
                return (
                  <button key={i} onClick={() => setSelectedParte(i)} style={{ background: isActive ? '#1a2744' : '#f8f9fa', border: isActive ? '1.5px solid #1a2744' : '1.5px solid transparent', borderRadius: 8, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
                    <div style={{ fontWeight: 700, color: isActive ? '#fff' : '#1a2744', fontSize: 13 }}>{parte.nombre}</div>
                    <div style={{ color: isActive ? 'rgba(255,255,255,0.7)' : '#6c757d', fontSize: 12, marginTop: 2 }}>{parte.rol}</div>
                    <div style={{ color: isActive ? '#fff' : '#c0392b', fontSize: 12, fontWeight: 600, marginTop: 6 }}>{parte.estado}</div>
                  </button>
                )
              })}
            </div>
            <div style={{ marginTop: 12, background: '#fff3e0', border: '1.5px solid #e67e22', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontWeight: 700, color: '#c0392b', fontSize: 13, marginBottom: 6 }}>Detalle de {practicanteData.partes[selectedParte].nombre}</div>
              <div style={{ color: '#495057', fontSize: 12.5, lineHeight: 1.6, marginBottom: 6 }}>{practicanteData.partes[selectedParte].detalle}</div>
              <div style={{ color: '#1a2744', fontSize: 12.5, fontWeight: 600 }}>Instancia: {practicanteData.partes[selectedParte].instancia}</div>
              <div style={{ color: '#1a2744', fontSize: 12.5, fontWeight: 600, marginTop: 2 }}>Corte: {practicanteData.partes[selectedParte].corte}</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard Abogado ────────────────────────────────────────────────────────
const encuestaItems = [
  { id: 'puntualidad', label: 'Puntualidad y asistencia', desc: 'Cumple con horarios y asiste regularmente' },
  { id: 'responsabilidad', label: 'Responsabilidad', desc: 'Entrega trabajos a tiempo y de forma completa' },
  { id: 'conocimiento', label: 'Conocimiento jurídico', desc: 'Aplica correctamente los conceptos legales' },
  { id: 'comunicacion', label: 'Comunicación', desc: 'Se comunica de forma clara y profesional' },
  { id: 'iniciativa', label: 'Iniciativa y proactividad', desc: 'Propone soluciones y actúa sin esperar instrucciones' },
  { id: 'etica', label: 'Ética profesional', desc: 'Mantiene confidencialidad y actúa con integridad' },
]

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => onChange(n)} style={{ cursor: 'pointer', color: n <= (hover || value) ? '#f39c12' : '#dee2e6', fontSize: 22, transition: 'color 0.1s', lineHeight: 1 }}>★</span>
      ))}
    </div>
  )
}

function DashboardAbogado() {
  const abogado = abogados[0]
  const misPracticantes = practicas.filter(p => p.abogadoIni === abogado.ini)
  const [selectedPracticante, setSelectedPracticante] = useState(misPracticantes[0])
  const [selectedParte, setSelectedParte] = useState(0)
  const [notifOpen, setNotifOpen] = useState(false)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [comentario, setComentario] = useState('')
  const [encuestaEnviada, setEncuestaEnviada] = useState(false)
  const [notifRead, setNotifRead] = useState<number[]>([])

  const notificaciones = [
    { id: 1, tipo: 'urgente', titulo: 'Práctica por finalizar', msg: `La práctica de Javiera Monsalve Reyes termina el 30/07/2026. Queda menos de 1 mes.`, fecha: 'Hoy, 09:14', leida: false },
    { id: 2, tipo: 'aviso', titulo: 'Encuesta de desempeño pendiente', msg: `Debe completar la encuesta de desempeño del 3° mes de Catalina Vera Muñoz.`, fecha: 'Ayer, 16:30', leida: false },
    { id: 3, tipo: 'info', titulo: 'Nuevo practicante asignado', msg: `Se ha asignado a Diego Fuentes Alarcón a su cargo para el período 01/07/2026 – 31/12/2026.`, fecha: '28/07/2026', leida: true },
  ]
  const unread = notificaciones.filter(n => !n.leida && !notifRead.includes(n.id)).length

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      {/* Header del abogado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar ini={abogado.ini} color={abogado.color} size={52} />
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a2744', margin: 0 }}>{abogado.nombre}</h1>
              <div style={{ color: '#6c757d', fontSize: 13.5, marginTop: 3 }}>{abogado.area} · Abogado Tutor</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{ background: '#e8f5e9', color: '#2e7d32', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>● {abogado.activos} practicantes activos</span>
                <span style={{ background: '#f1f3f5', color: '#495057', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>Consultorio Centro — Concepción</span>
              </div>
            </div>
          </div>
          <Breadcrumb items={['Inicio', 'Vista Abogado', abogado.nombre]} />
        </div>

        {/* Bell / notificaciones */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setNotifOpen(o => !o)} style={{ position: 'relative', background: '#fff', border: '1.5px solid #e9ecef', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#495057', fontWeight: 600, fontSize: 13 }}>
            <Icon name="bell" size={17} />
            Notificaciones
            {unread > 0 && <span style={{ background: '#c0392b', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>{unread}</span>}
          </button>

          {notifOpen && (
            <div style={{ position: 'absolute', right: 0, top: '110%', width: 360, background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 100 }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f3f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 14 }}>Notificaciones</span>
                <button onClick={() => { setNotifRead([1, 2, 3]); }} style={{ border: 'none', background: 'none', color: '#6c757d', fontSize: 12, cursor: 'pointer' }}>Marcar todas como leídas</button>
              </div>
              {notificaciones.map(n => {
                const isRead = n.leida || notifRead.includes(n.id)
                const tipoCfg = n.tipo === 'urgente' ? { bg: '#fff3e0', border: '#e67e22', icon: 'bell', iconColor: '#e67e22' }
                  : n.tipo === 'aviso' ? { bg: '#fff8e1', border: '#f39c12', icon: 'clipboard', iconColor: '#f39c12' }
                  : { bg: '#e8f4fd', border: '#2980b9', icon: 'info', iconColor: '#2980b9' }
                return (
                  <div key={n.id} onClick={() => setNotifRead(prev => [...prev, n.id])} style={{ padding: '14px 18px', borderBottom: '1px solid #f8f9fa', background: isRead ? '#fff' : tipoCfg.bg, cursor: 'pointer', transition: 'background 0.15s' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${tipoCfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tipoCfg.iconColor, flexShrink: 0, background: '#fff' }}>
                        <Icon name={tipoCfg.icon} size={15} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: isRead ? 500 : 700, color: '#1a2744', fontSize: 13 }}>{n.titulo}</div>
                        <div style={{ color: '#6c757d', fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>{n.msg}</div>
                        <div style={{ color: '#adb5bd', fontSize: 11, marginTop: 5 }}>{n.fecha}</div>
                      </div>
                      {!isRead && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c0392b', flexShrink: 0, marginTop: 4 }} />}
                    </div>
                  </div>
                )
              })}
              <div style={{ padding: '10px 18px', textAlign: 'center' }}>
                <button onClick={() => setNotifOpen(false)} style={{ border: 'none', background: 'none', color: '#6c757d', fontSize: 12.5, cursor: 'pointer' }}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 18 }}>
        {/* Lista de practicantes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 13, letterSpacing: '0.04em', padding: '0 2px' }}>MIS PRACTICANTES</div>
          {misPracticantes.map(p => (
            <div key={p.id} onClick={() => setSelectedPracticante(p)}
              style={{ background: selectedPracticante.id === p.id ? '#1a2744' : '#fff', border: `1.5px solid ${selectedPracticante.id === p.id ? '#1a2744' : '#e9ecef'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Avatar ini={p.practicante.split(' ').map(n => n[0]).join('').slice(0, 2)} color={p.uniColor} size={34} />
                <div>
                  <div style={{ fontWeight: 700, color: selectedPracticante.id === p.id ? '#fff' : '#1a2744', fontSize: 13 }}>{p.practicante}</div>
                  <div style={{ color: selectedPracticante.id === p.id ? 'rgba(255,255,255,0.6)' : '#6c757d', fontSize: 11.5 }}>{p.universidad}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <StatusBadge estado={p.estado} />
                <span style={{ color: selectedPracticante.id === p.id ? 'rgba(255,255,255,0.5)' : '#adb5bd', fontSize: 11 }}>Termina {p.termino}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel derecho */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Ficha practicante */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Avatar ini={selectedPracticante.practicante.split(' ').map(n => n[0]).join('').slice(0, 2)} color={selectedPracticante.uniColor} size={48} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#1a2744' }}>{selectedPracticante.practicante}</div>
                  <div style={{ color: '#6c757d', fontSize: 13, marginTop: 2 }}>{selectedPracticante.universidad}</div>
                  <div style={{ marginTop: 6 }}><StatusBadge estado={selectedPracticante.estado} /></div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#6c757d', fontSize: 12 }}>Período de práctica</div>
                <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 13, marginTop: 2 }}>{selectedPracticante.inicio} – {selectedPracticante.termino}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { icon: 'phone', label: 'Teléfono', value: selectedPracticante.tel },
                { icon: 'mail', label: 'Correo electrónico', value: selectedPracticante.email },
                { icon: 'building', label: 'Consultorio asignado', value: selectedPracticante.consultorio },
                { icon: 'heart', label: 'Discapacidad', value: selectedPracticante.discapacidad },
              ].map((item, i) => (
                <div key={i} style={{ background: '#f8f9fa', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6c757d', fontSize: 11.5, fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em' }}>
                    <Icon name={item.icon} size={12} />
                    {item.label.toUpperCase()}
                  </div>
                  <div style={{ color: '#1a2744', fontSize: 13.5, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Alerta si queda menos de 1 mes */}
            {selectedPracticante.estado === 'Por terminar' && (
              <div style={{ marginTop: 14, background: '#fff3e0', border: '1.5px solid #e67e22', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ color: '#e67e22', flexShrink: 0 }}><Icon name="bell" size={17} /></span>
                <div>
                  <div style={{ fontWeight: 700, color: '#c0392b', fontSize: 13 }}>Proximidad al cierre de práctica</div>
                  <div style={{ color: '#6c757d', fontSize: 12.5, marginTop: 2 }}>La práctica de <strong>{selectedPracticante.practicante}</strong> finaliza el <strong>{selectedPracticante.termino}</strong>. Recuerde completar el informe de cierre y la encuesta final de desempeño.</div>
                </div>
              </div>
            )}
          </Card>

          {/* Próximas audiencias */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="calendar" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Próximas audiencias</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {audiencias.map((audiencia, i) => (
                <div key={i} style={{ background: '#f8f9fa', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 13 }}>{audiencia.fecha} · {audiencia.tipo}</div>
                  <div style={{ color: '#6c757d', fontSize: 12, marginTop: 2 }}>Ámbito: {audiencia.ambito}</div>
                  <div style={{ color: '#495057', fontSize: 12.5, marginTop: 4 }}>{audiencia.detalle}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Minutas */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Icon name="clipboard" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Minutas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontWeight: 600, color: '#1a2744', fontSize: 13 }}>Minuta pendiente de revisión</div>
                <div style={{ color: '#6c757d', fontSize: 12, marginTop: 2 }}>Audiencia preparatoria del 05/08/2026 en Derecho de Familia.</div>
              </div>
              <div style={{ background: '#e8f4fd', borderRadius: 8, padding: '12px 14px', color: '#1565c0', fontSize: 12.5, fontWeight: 600 }}>Revisión de minuta pendiente para la próxima audiencia.</div>
            </div>
          </Card>

          {/* Partes involucradas */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="info" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Partes involucradas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { nombre: 'Sra. Ana María Pérez', rol: 'Parte demandante', estado: 'Disconforme con la estrategia', detalle: 'Solicita mayor claridad en los plazos del proceso.', instancia: 'Primera instancia', corte: 'Corte de Apelaciones de Concepción' },
                { nombre: 'Sr. Luis Gutiérrez', rol: 'Parte demandada', estado: 'Requiere información adicional', detalle: 'Solicita actualización del estado del caso.', instancia: 'Segunda instancia', corte: 'Corte de Apelaciones de Concepción' },
              ].map((parte, i) => {
                const isActive = selectedParte === i
                return (
                  <button key={i} onClick={() => setSelectedParte(i)} style={{ background: isActive ? '#1a2744' : '#f8f9fa', border: isActive ? '1.5px solid #1a2744' : '1.5px solid transparent', borderRadius: 8, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}>
                    <div style={{ fontWeight: 700, color: isActive ? '#fff' : '#1a2744', fontSize: 13 }}>{parte.nombre}</div>
                    <div style={{ color: isActive ? 'rgba(255,255,255,0.7)' : '#6c757d', fontSize: 12, marginTop: 2 }}>{parte.rol}</div>
                    <div style={{ color: isActive ? '#fff' : '#c0392b', fontSize: 12, fontWeight: 600, marginTop: 6 }}>{parte.estado}</div>
                  </button>
                )
              })}
            </div>
            <div style={{ marginTop: 12, background: '#fff3e0', border: '1.5px solid #e67e22', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontWeight: 700, color: '#c0392b', fontSize: 13, marginBottom: 6 }}>Detalle de {['Sra. Ana María Pérez', 'Sr. Luis Gutiérrez'][selectedParte]}</div>
              <div style={{ color: '#495057', fontSize: 12.5, lineHeight: 1.6, marginBottom: 6 }}>{['Solicita mayor claridad en los plazos del proceso.', 'Solicita actualización del estado del caso.'][selectedParte]}</div>
              <div style={{ color: '#1a2744', fontSize: 12.5, fontWeight: 600 }}>Instancia: {['Primera instancia', 'Segunda instancia'][selectedParte]}</div>
              <div style={{ color: '#1a2744', fontSize: 12.5, fontWeight: 600, marginTop: 2 }}>Corte: {['Corte de Apelaciones de Concepción', 'Corte de Apelaciones de Concepción'][selectedParte]}</div>
            </div>
          </Card>

          {/* Encuesta de desempeño */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <Icon name="clipboard" size={16} />
              <span style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>Encuesta de desempeño</span>
              <span style={{ background: '#e8f4fd', color: '#1565c0', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10, marginLeft: 4 }}>3° mes</span>
            </div>

            {encuestaEnviada ? (
              <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#27ae60' }}><Icon name="check" size={28} /></div>
                <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 16, marginBottom: 6 }}>Encuesta enviada</div>
                <div style={{ color: '#6c757d', fontSize: 13.5 }}>La evaluación de desempeño fue registrada correctamente.</div>
                <button onClick={() => { setEncuestaEnviada(false); setRatings({}); setComentario('') }} style={{ marginTop: 18, border: '1.5px solid #dee2e6', background: '#fff', color: '#495057', padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Nueva encuesta</button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {encuestaItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: '#f8f9fa', borderRadius: 9 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: '#1a2744', fontSize: 13 }}>{item.label}</div>
                        <div style={{ color: '#adb5bd', fontSize: 12, marginTop: 2 }}>{item.desc}</div>
                      </div>
                      <StarRating value={ratings[item.id] || 0} onChange={v => setRatings(r => ({ ...r, [item.id]: v }))} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 600, color: '#495057', fontSize: 13, marginBottom: 8 }}>Comentarios generales</div>
                  <textarea
                    value={comentario}
                    onChange={e => setComentario(e.target.value)}
                    placeholder="Agregue observaciones, logros destacados o áreas de mejora del practicante..."
                    style={{ width: '100%', padding: '10px 13px', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13.5, outline: 'none', color: '#343a40', background: '#fff', fontFamily: 'Inter, sans-serif', minHeight: 90, resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                  <button
                    onClick={() => Object.keys(ratings).length >= 3 && setEncuestaEnviada(true)}
                    style={{ background: Object.keys(ratings).length >= 3 ? '#1a2744' : '#ced4da', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: Object.keys(ratings).length >= 3 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Icon name="send" size={15} />
                    Enviar evaluación
                  </button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

// ─── Registration Form ────────────────────────────────────────────────────────
const regiones = ['Región del Biobío', 'Región Metropolitana', 'Región de La Araucanía', 'Región del Maule', 'Región de Los Lagos', 'Región de Valparaíso', 'Otra región']
const comunas: Record<string, string[]> = {
  'Región del Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chillán', 'Los Ángeles', 'Penco', 'Coronel'],
  'Región Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto'],
  'Región de La Araucanía': ['Temuco', 'Villarrica', 'Pucón', 'Angol'],
  'Región del Maule': ['Talca', 'Curicó', 'Linares'],
  'Región de Los Lagos': ['Puerto Montt', 'Osorno', 'Castro'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
  'Otra región': ['Otra comuna'],
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 12.5, fontWeight: 600, color: '#495057', letterSpacing: '0.02em' }}>
        {label} {required && <span style={{ color: '#c0392b' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = { padding: '9px 12px', border: '1.5px solid #dee2e6', borderRadius: 8, fontSize: 13.5, outline: 'none', color: '#343a40', background: '#fff', width: '100%', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.15s' }
const selectStyle: React.CSSProperties = { ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36 }

function Formulario() {
  const [step, setStep] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [fileName, setFileName] = useState('')
  const [notasFile, setNotasFile] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const notasRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    nombre: '', apellido: '', correo: '', telefono: '', genero: '', universidad: '',
    region: '', direccion: '', comuna: '', nacionalidad: '', contactoNombre: '',
    vinculo: '', contactoCorreo: '', salud: '', rut: '', fechaNac: '',
    discapacidad: '', tieneDiscapacidad: '',
    colegio: '', universidad2: '', añoCarrera: '', egreso: '', especialidad: '', magister: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const steps = ['Acceso', 'Carta de presentación', 'Datos personales', 'Antecedentes educativos']

  return (
    <div style={{ minHeight: '100vh', background: '#f1f3f5', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px 60px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 56, height: 56, background: '#1a2744', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z"/><path d="M12 12v7"/><path d="M12 12l7-4"/><path d="M12 12L5 8"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Roboto Slab', serif", fontSize: 17, fontWeight: 700, color: '#1a2744', lineHeight: 1.2 }}>Corporación de Asistencia Judicial</div>
            <div style={{ color: '#c0392b', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em' }}>REGIÓN DEL BIOBÍO</div>
          </div>
        </div>
        <div style={{ color: '#6c757d', fontSize: 13.5 }}>Sistema de Gestión de Practicantes — Formulario de Postulación</div>
      </div>

      {/* Progress */}
      <div style={{ width: '100%', maxWidth: 720, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((s, i) => {
            const n = i + 1; const done = step > n; const active = step === n
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: done ? '#27ae60' : active ? '#1a2744' : '#dee2e6', color: done || active ? '#fff' : '#adb5bd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, transition: 'all 0.2s' }}>
                    {done ? <Icon name="check" size={16} /> : n}
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? '#1a2744' : done ? '#27ae60' : '#adb5bd', whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: 80, height: 2, background: step > n ? '#27ae60' : '#dee2e6', margin: '0 8px', marginBottom: 24, transition: 'background 0.2s' }} />}
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 720 }}>
        {step === 0 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ background: '#1a2744', padding: '20px 28px' }}>
              <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Ingresar postulación</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 4, marginBottom: 0 }}>Pulse el botón para avanzar al siguiente paso de la postulación.</p>
            </div>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => setStep(1)} style={{ background: '#2980b9', color: '#fff', border: 'none', padding: '16px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 12px 24px rgba(41, 128, 185, 0.18)' }}>
                  Ingresar postulación
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ background: '#1a2744', padding: '20px 28px' }}>
              <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Carta de Presentación y Términos de Postulación</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 4, marginBottom: 0 }}>Lea detenidamente las condiciones antes de continuar</p>
            </div>
            <div style={{ padding: '28px' }}>
              <div style={{ background: '#f8f9fa', borderRadius: 10, border: '1px solid #e9ecef', padding: '24px 28px', maxHeight: 360, overflowY: 'auto', lineHeight: 1.8, color: '#495057', fontSize: 13.5 }}>
                <p style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 700, color: '#1a2744', fontSize: 16, marginTop: 0 }}>Estimado/a Postulante:</p>
                <p>La <strong>Corporación de Asistencia Judicial de la Región del Biobío</strong>, en cumplimiento de su misión institucional de facilitar el acceso a la justicia a toda la ciudadanía, pone a disposición de los estudiantes de Derecho el presente Programa de Práctica Profesional, el cual constituye una oportunidad de formación de excelencia en el ejercicio del Derecho.</p>
                <p>Este programa tiene como propósito contribuir a la formación práctica de futuros abogados, permitiéndoles aplicar los conocimientos adquiridos durante su formación académica en situaciones reales y de alto impacto social. Los practicantes colaborarán directamente con abogados tutores de esta Corporación en la atención de usuarios, elaboración de escritos jurídicos y seguimiento de causas.</p>
                <p style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 700, color: '#1a2744', marginTop: 24 }}>Términos y Condiciones de Participación</p>
                <p><strong>1. Requisitos de Postulación:</strong> Ser estudiante regular de la carrera de Derecho en alguna universidad reconocida por el Estado de Chile, haber cursado al menos el cuarto año de la carrera, contar con certificado de alumno regular vigente y no tener reprobaciones pendientes en ramos obligatorios del plan de estudios.</p>
                <p><strong>2. Duración y Modalidad:</strong> La práctica profesional tiene una duración mínima de seis meses y máxima de doce meses, en modalidad presencial en las dependencias de la Corporación. El horario será de lunes a viernes, con jornada completa o parcial según se acuerde con el abogado tutor asignado.</p>
                <p><strong>3. Compromisos del Practicante:</strong> El practicante se compromete a mantener absoluta confidencialidad respecto de los casos atendidos, asistir con puntualidad y regularidad, respetar el reglamento interno de la institución, actuar conforme a los principios éticos de la profesión jurídica y participar activamente en las jornadas de capacitación que la Corporación organice.</p>
                <p><strong>4. Tratamiento de Datos Personales:</strong> Los datos personales proporcionados en este formulario serán tratados con estricta confidencialidad, conforme a la Ley N° 19.628 sobre Protección de la Vida Privada. Serán utilizados exclusivamente para los fines del proceso de selección y gestión de la práctica. No serán cedidos a terceros sin su consentimiento expreso.</p>
                <p><strong>5. Proceso de Selección:</strong> La Corporación se reserva el derecho de aceptar o rechazar postulaciones según sus necesidades institucionales. La notificación del resultado se realizará vía correo electrónico en un plazo máximo de 15 días hábiles.</p>
                <p><strong>6. Beneficios:</strong> Abogado tutor designado, acceso a recursos institucionales, certificado de práctica al término del período y posibilidad de vinculación continua según desempeño.</p>
                <p style={{ marginBottom: 0 }}><em>Concepción, {new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
              </div>
              <div onClick={() => setAccepted(a => !a)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 20, cursor: 'pointer', userSelect: 'none' }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${accepted ? '#1a2744' : '#ced4da'}`, background: accepted ? '#1a2744' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all 0.15s' }}>
                  {accepted && <Icon name="check" size={12} />}
                </div>
                <span style={{ fontSize: 13.5, color: '#495057', lineHeight: 1.5 }}>He leído y acepto los términos y condiciones del programa de práctica profesional de la Corporación de Asistencia Judicial del Biobío.</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                <button onClick={() => accepted && setStep(2)} style={{ background: accepted ? '#1a2744' : '#ced4da', color: '#fff', border: 'none', padding: '11px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: accepted ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 8 }}>
                  Continuar <Icon name="arrow_right" size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ background: '#1a2744', padding: '20px 28px' }}>
              <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Datos Personales</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 4, marginBottom: 0 }}>Complete todos los campos requeridos con su información personal</p>
            </div>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Nombre" required><input style={inputStyle} value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Ej: María José" /></FormField>
                <FormField label="Apellido" required><input style={inputStyle} value={form.apellido} onChange={e => set('apellido', e.target.value)} placeholder="Ej: González Martínez" /></FormField>
                <FormField label="RUT" required><input style={inputStyle} value={form.rut} onChange={e => set('rut', e.target.value)} placeholder="Ej: 20.123.456-7" /></FormField>
                <FormField label="Fecha de nacimiento" required><input type="date" style={inputStyle} value={form.fechaNac} onChange={e => set('fechaNac', e.target.value)} /></FormField>
                <FormField label="Correo electrónico" required><input type="email" style={inputStyle} value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="correo@universidad.cl" /></FormField>
                <FormField label="Número de teléfono" required><input style={inputStyle} value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="+56 9 XXXX XXXX" /></FormField>
                <FormField label="Género" required>
                  <select style={selectStyle} value={form.genero} onChange={e => set('genero', e.target.value)}>
                    <option value="">Seleccione...</option>
                    <option>Femenino</option><option>Masculino</option><option>No binario</option><option>Prefiero no indicar</option>
                  </select>
                </FormField>
                <FormField label="Nacionalidad" required><input style={inputStyle} value={form.nacionalidad} onChange={e => set('nacionalidad', e.target.value)} placeholder="Ej: Chilena" /></FormField>
                <FormField label="Universidad" required>
                  <select style={selectStyle} value={form.universidad} onChange={e => set('universidad', e.target.value)}>
                    <option value="">Seleccione universidad...</option>
                    <option>Universidad de Concepción</option><option>Universidad del Bío-Bío</option>
                    <option>Universidad Católica de la Santísima Concepción (UCSC)</option>
                    <option>Universidad San Sebastián</option><option>Universidad de Chile</option><option>Otra universidad</option>
                  </select>
                </FormField>
                <FormField label="Certificado de alumno regular" required>
                  <div onClick={() => fileRef.current?.click()} style={{ border: '1.5px dashed #ced4da', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, background: '#fafafa', color: '#6c757d', fontSize: 13 }}>
                    <Icon name="upload" size={16} /><span>{fileName || 'Subir certificado (PDF)'}</span>
                    <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => setFileName(e.target.files?.[0]?.name || '')} />
                  </div>
                </FormField>
              </div>

              {/* Discapacidad */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f3f5' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', letterSpacing: '0.04em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="heart" size={14} /> INFORMACIÓN DE ACCESIBILIDAD
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                  <FormField label="¿Presenta alguna discapacidad?" required>
                    <select style={selectStyle} value={form.tieneDiscapacidad} onChange={e => set('tieneDiscapacidad', e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option>No</option><option>Sí, física</option><option>Sí, sensorial (visual)</option>
                      <option>Sí, sensorial (auditiva)</option><option>Sí, intelectual</option><option>Sí, psíquica</option><option>Sí, otra</option>
                    </select>
                  </FormField>
                  {form.tieneDiscapacidad && form.tieneDiscapacidad !== 'No' && (
                    <FormField label="Descripción de la discapacidad y necesidades de apoyo">
                      <input style={inputStyle} value={form.discapacidad} onChange={e => set('discapacidad', e.target.value)} placeholder="Indique tipo y grado de discapacidad, y si requiere adaptaciones especiales" />
                    </FormField>
                  )}
                </div>
              </div>

              {/* Domicilio */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f3f5' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', letterSpacing: '0.04em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="building" size={14} /> DOMICILIO
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 16 }}>
                  <FormField label="Región" required>
                    <select style={selectStyle} value={form.region} onChange={e => { set('region', e.target.value); set('comuna', '') }}>
                      <option value="">Seleccione...</option>
                      {regiones.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Dirección" required><input style={inputStyle} value={form.direccion} onChange={e => set('direccion', e.target.value)} placeholder="Calle, número, depto." /></FormField>
                  <FormField label="Comuna" required>
                    <select style={selectStyle} value={form.comuna} onChange={e => set('comuna', e.target.value)} disabled={!form.region}>
                      <option value="">Seleccione...</option>
                      {(comunas[form.region] || []).map(c => <option key={c}>{c}</option>)}
                    </select>
                  </FormField>
                </div>
              </div>

              {/* Contacto emergencia */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f3f5' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', letterSpacing: '0.04em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="phone" size={14} /> CONTACTO DE EMERGENCIA
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <FormField label="Nombre completo" required><input style={inputStyle} value={form.contactoNombre} onChange={e => set('contactoNombre', e.target.value)} placeholder="Nombre y apellido" /></FormField>
                  <FormField label="Vínculo con la persona" required>
                    <select style={selectStyle} value={form.vinculo} onChange={e => set('vinculo', e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option>Padre / Madre</option><option>Hermano/a</option><option>Cónyuge / Pareja</option><option>Amigo/a</option><option>Otro</option>
                    </select>
                  </FormField>
                  <FormField label="Correo de emergencia" required><input type="email" style={inputStyle} value={form.contactoCorreo} onChange={e => set('contactoCorreo', e.target.value)} placeholder="correo@ejemplo.cl" /></FormField>
                </div>
              </div>

              {/* Salud */}
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f3f5' }}>
                <FormField label="Antecedentes de salud relevantes">
                  <textarea value={form.salud} onChange={e => set('salud', e.target.value)} placeholder="Indique alergias, condiciones médicas u otras consideraciones relevantes. Puede escribir 'Ninguno' si no aplica." style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} />
                </FormField>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                <button onClick={() => setStep(0)} style={{ background: '#fff', color: '#495057', border: '1.5px solid #dee2e6', padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="chevron_left" size={16} /> Volver
                </button>
                <button onClick={() => setStep(3)} style={{ background: '#1a2744', color: '#fff', border: 'none', padding: '11px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  Continuar <Icon name="arrow_right" size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ background: '#1a2744', padding: '20px 28px' }}>
              <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0 }}>Antecedentes Educativos</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 4, marginBottom: 0 }}>Información sobre su trayectoria académica</p>
            </div>
            <div style={{ padding: '28px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', letterSpacing: '0.04em', marginBottom: 14 }}>ENSEÑANZA MEDIA</div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <FormField label="Colegio / Liceo en que estudió" required><input style={inputStyle} value={form.colegio} onChange={e => set('colegio', e.target.value)} placeholder="Nombre del establecimiento" /></FormField>
                <FormField label="Concentración de notas" required>
                  <div onClick={() => notasRef.current?.click()} style={{ border: '1.5px dashed #ced4da', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, background: '#fafafa', color: '#6c757d', fontSize: 13 }}>
                    <Icon name="upload" size={16} /><span>{notasFile || 'Subir concentración (PDF)'}</span>
                    <input ref={notasRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => setNotasFile(e.target.files?.[0]?.name || '')} />
                  </div>
                </FormField>
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #f1f3f5' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', letterSpacing: '0.04em', marginBottom: 14 }}>FORMACIÓN UNIVERSITARIA</div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
                  <FormField label="Universidad en que estudia o estudió" required>
                    <select style={selectStyle} value={form.universidad2} onChange={e => set('universidad2', e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option>Universidad de Concepción</option><option>Universidad del Bío-Bío</option>
                      <option>Universidad Católica de la Santísima Concepción (UCSC)</option>
                      <option>Universidad San Sebastián</option><option>Universidad de Chile</option>
                      <option>Pontificia Universidad Católica de Chile</option><option>Otra universidad</option>
                    </select>
                  </FormField>
                  <FormField label="Año de carrera actual">
                    <select style={selectStyle} value={form.añoCarrera} onChange={e => set('añoCarrera', e.target.value)}>
                      <option value="">Seleccione...</option>
                      <option>1° año</option><option>2° año</option><option>3° año</option><option>4° año</option><option>5° año</option><option>Egresado/a</option>
                    </select>
                  </FormField>
                  <FormField label="Año de egreso (si aplica)"><input style={inputStyle} value={form.egreso} onChange={e => set('egreso', e.target.value)} placeholder="Ej: 2025" type="number" min="2000" max="2030" /></FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
                  <FormField label="Especialidad o mención en Derecho">
                    <select style={selectStyle} value={form.especialidad} onChange={e => set('especialidad', e.target.value)}>
                      <option value="">Seleccione especialidad...</option>
                      <option>Derecho Civil</option><option>Derecho Penal</option><option>Derecho Laboral</option>
                      <option>Derecho de Familia</option><option>Derecho Comercial</option>
                      <option>Derecho Administrativo</option><option>Derecho Constitucional</option><option>Sin mención específica</option>
                    </select>
                  </FormField>
                  <FormField label="¿Cuenta con Magíster?" required>
                    <select style={selectStyle} value={form.magister} onChange={e => set('magister', e.target.value)}>
                      <option value="">Seleccione...</option><option>Sí, titulado</option><option>Sí, en curso</option><option>No</option>
                    </select>
                  </FormField>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
                <button onClick={() => setStep(2)} style={{ background: '#fff', color: '#495057', border: '1.5px solid #dee2e6', padding: '10px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="chevron_left" size={16} /> Volver
                </button>
                <button onClick={() => setStep(4 as any)} style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '11px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  Enviar postulación <Icon name="check" size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {(step as any) === 4 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9ecef', padding: '60px 40px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#27ae60' }}><Icon name="check" size={36} /></div>
            <h2 style={{ fontFamily: "'Roboto Slab', serif", fontSize: 24, color: '#1a2744', margin: '0 0 12px' }}>¡Postulación enviada!</h2>
            <p style={{ color: '#6c757d', fontSize: 14.5, maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.7 }}>Su postulación ha sido recibida con éxito. Le notificaremos el resultado del proceso a su correo en un plazo de 15 días hábiles.</p>
            <button onClick={() => { setStep(0); setAccessCode(''); setAccessError(''); setAccepted(false); setFileName(''); setNotasFile('') }} style={{ background: '#1a2744', color: '#fff', border: 'none', padding: '11px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Nueva postulación
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('panel')

  if (page === 'formulario') {
    return (
      <div>
        <div style={{ background: '#1a2744', borderBottom: '3px solid #c0392b', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setPage('panel')} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', padding: '7px 14px', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
            <Icon name="chevron_left" size={14} /> Volver al panel
          </button>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Sistema de Gestión de Practicantes</span>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#c0392b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>AD</div>
        </div>
        <Formulario />
      </div>
    )
  }

  const titles: Record<Page, string> = {
    panel: 'Sistema de Gestión de Practicantes',
    postulaciones: 'Sistema de Gestión de Practicantes',
    practicas: 'Sistema de Gestión de Practicantes',
    historial: 'Sistema de Gestión de Practicantes',
    consultorio: 'Sistema de Gestión de Practicantes',
    formulario: 'Formulario de Postulación',
    abogadoDash: 'Portal del Abogado Tutor',
    practicanteDash: 'Portal del Practicante',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f3f5' }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header title={titles[page]} notifCount={page === 'abogadoDash' ? 2 : 0} />
        <main style={{ flex: 1, background: '#f1f3f5', minHeight: 0 }}>
          {page === 'panel' && <PanelGeneral setPage={setPage} />}
          {page === 'postulaciones' && <Postulaciones />}
          {page === 'practicas' && <PracticasActivas />}
          {page === 'historial' && <Historial />}
          {page === 'consultorio' && <Consultorios />}
          {page === 'abogadoDash' && <DashboardAbogado />}
          {page === 'practicanteDash' && <DashboardPracticante />}
        </main>
        {page === 'panel' && (
          <div style={{ position: 'fixed', bottom: 28, right: 28 }}>
            <button onClick={() => setPage('formulario')} style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '13px 22px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 16px rgba(192,57,43,0.4)' }}>
              <Icon name="user_plus" size={18} />
              Nueva postulación
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
