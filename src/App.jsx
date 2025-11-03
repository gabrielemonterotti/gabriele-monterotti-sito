import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

function Container({ children }) {
  return <div className="container">{children}</div>
}

function Header() {
  return (
    <header className="site-header">
      <Container>
        <div className="header-inner">
          <Link to="/" className="brand">Gabriele Monterotti</Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/servizi">Servizi</Link>
            <Link to="/chi-sono">Chi sono</Link>
            <Link to="/contatti">Contatti</Link>
          </nav>
        </div>
      </Container>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Gabriele Monterotti — Allenamento & Nutrizione</div>
          <div>gabriele@example.com • +39 345 000 0000</div>
        </div>
      </Container>
    </footer>
  )
}

function Home() {
  return (
    <div>
      <section className="hero">
        <Container>
          <div className="hero-grid">
            <div>
              <h1>Gabriele Monterotti</h1>
              <p className="lead">Allenamento personalizzato e piani di nutrizione per ottenere risultati reali — in palestra, a casa o online.</p>
              <div className="hero-cta">
                <Link to="/servizi" className="btn btn-outline">Scopri i servizi</Link>
                <Link to="/contatti" className="btn">Prenota consulenza</Link>
              </div>
            </div>
            <div className="hero-image">Foto / immagine di Gabriele</div>
          </div>
        </Container>
      </section>

      <section className="features">
        <Container>
          <h2>Per chi è</h2>
          <p className="muted">Programmi su misura per principianti, atleti amatoriali o persone con obiettivi specifici.</p>
          <div className="cards">
            <div className="card"><h3>Personal Training</h3><p>Sessioni 1:1 in presenza, valutazione e programmazione personalizzata.</p></div>
            <div className="card"><h3>Nutrizione</h3><p>Piani alimentari pratici, sostenibili e basati su obiettivi reali.</p></div>
            <div className="card"><h3>Allenamento Online</h3><p>Programmi e check-in a distanza, con monitoraggio e adattamenti.</p></div>
          </div>
        </Container>
      </section>
    </div>
  )
}

function Servizi() {
  const servizi = [
    { titolo: 'Valutazione Iniziale', desc: 'Analisi posturale e test di performance.' },
    { titolo: 'Programma Personalizzato', desc: 'Piano di allenamento su misura con progressione.' },
    { titolo: 'Piano Alimentare', desc: 'Scheda nutrizionale pratica e sostenibile.' },
    { titolo: 'Allenamento Online', desc: 'Programmi digitali con follow-up.' },
    { titolo: 'Coaching Continuativo', desc: 'Controlli periodici e adattamenti.' }
  ]

  return (
    <Container>
      <h1>Servizi</h1>
      <p className="muted">Tutti i servizi pensati per accompagnarti passo dopo passo.</p>
      <div className="services-grid">
        {servizi.map(s => (
          <div key={s.titolo} className="service-card">
            <h3>{s.titolo}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="packages">
        <h2>Pacchetti popolari</h2>
        <div className="packages-grid">
          <div className="package"><strong>Starter</strong><p>Valutazione + 4 settimane di programma</p></div>
          <div className="package"><strong>Pro</strong><p>Programmazione trimestrale + piano nutrizionale</p></div>
          <div className="package"><strong>Online</strong><p>Programmi digitali con check-in settimanale</p></div>
        </div>
      </div>
    </Container>
  )
}

function ChiSono() {
  return (
    <Container>
      <h1>Chi sono</h1>
      <p>Sono Gabriele Monterotti, personal trainer e coach nutrizionale. Lavoro con clienti di tutte le età per migliorare salute, forza e fiducia nel proprio corpo.</p>
      <h3>Metodo</h3>
      <p className="muted">Approccio minimal, basato su evidenze e sostenibilità.</p>
      <h3>Credenziali</h3>
      <ul>
        <li>Certificazione in Personal Training</li>
        <li>Master in Nutrizione Applicata</li>
        <li>Esperienza con atleti amatoriali e professionisti</li>
      </ul>
    </Container>
  )
}

function Contatti() {
  const [form, setForm] = React.useState({ nome:'', email:'', telefono:'', messaggio:'' })
  const [status, setStatus] = React.useState(null)

  function handleChange(e){ setForm(f=>({...f,[e.target.name]: e.target.value})) }

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('loading')
    const endpoint = 'https://formspree.io/f/your-form-id' // <-- Replace with your endpoint
    try{
      const res = await fetch(endpoint, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      if(res.ok){ setStatus('success'); setForm({nome:'',email:'',telefono:'',messaggio:''}) }
      else setStatus('error')
    }catch(err){ console.error(err); setStatus('error') }
  }

  return (
    <Container>
      <h1>Contatti</h1>
      <p className="muted">Compila il form qui sotto per richiedere informazioni o prenotare una consulenza.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>Nome<input name="nome" value={form.nome} onChange={handleChange} required/></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} required/></label>
        <label>Telefono (opz.)<input name="telefono" value={form.telefono} onChange={handleChange}/></label>
        <label>Messaggio<textarea name="messaggio" value={form.messaggio} onChange={handleChange} required/></label>
        <div className="form-actions">
          <button type="submit" className="btn" disabled={status==='loading'}>{status==='loading'? 'Invio...':'Invia messaggio'}</button>
          {status==='success' && <div className="success">Messaggio inviato. Ti risponderò presto!</div>}
          {status==='error' && <div className="error">Si è verificato un errore. Riprova più tardi.</div>}
        </div>
      </form>

      <div className="contact-details">
        <p>Oppure scrivi direttamente a: <strong>gabriele@example.com</strong></p>
        <p>Telefono: <strong>+39 345 000 0000</strong></p>
      </div>
    </Container>
  )
}

export default function App(){
  return (
    <div className="site">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/servizi" element={<Servizi/>} />
          <Route path="/chi-sono" element={<ChiSono/>} />
          <Route path="/contatti" element={<Contatti/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
