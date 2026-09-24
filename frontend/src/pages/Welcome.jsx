import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Welcome() {
  const { signed } = useAuth();

  return (
    <main className="welcome-page">
      <header className="welcome-header">
        <Link className="welcome-brand" to="/">
          <span className="logo-icon">LV</span>
          <span>
            <strong>Little Ville</strong>
            <small>arquivo de campo</small>
          </span>
        </Link>
        {signed && (
          <nav className="welcome-nav" aria-label="Navegação principal">
            <Link className="btn btn-secondary" to="/dashboard">Abrir painel</Link>
          </nav>
        )}
      </header>

      <section className="welcome-hero">
        <div className="welcome-copy">
          <p className="auth-kicker">OBSERVAR  /  REGISTRAR  /  COMPARTILHAR</p>
          <h1>Os sinais da cidade merecem ser lembrados.</h1>
          <p className="welcome-description">
            Little Ville é o arquivo coletivo para mapear avistamentos, reunir evidências
            e descobrir os padrões escondidos no cotidiano da nossa cidade.
          </p>
          <div className="welcome-actions">
            {signed ? (
              <Link className="btn btn-primary" to="/dashboard">Ir para o dashboard <span aria-hidden="true">-&gt;</span></Link>
            ) : (
              <>
                <Link className="btn btn-primary" to="/register">Criar minha conta <span aria-hidden="true">-&gt;</span></Link>
                <Link className="btn btn-secondary" to="/login">Já tenho acesso</Link>
              </>
            )}
          </div>
        </div>

        <div className="welcome-signal" aria-label="Resumo do arquivo Little Ville">
          <div className="signal-orbit signal-orbit-large" />
          <div className="signal-orbit signal-orbit-small" />
          <div className="signal-center">
            <span>LV</span>
            <small>FIELD<br />NOTE 001</small>
          </div>
          <span className="signal-label signal-label-top">ARQUIVO ABERTO</span>
          <span className="signal-label signal-label-right">+ 124 REGISTROS</span>
          <span className="signal-label signal-label-bottom">A CIDADE OBSERVA</span>
        </div>
      </section>

    </main>
  );
}