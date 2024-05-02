import { Container } from "@mui/material";
import Footer from "../components/shared/layout/footer/Footer";

const Privacy = () => {
  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center" }}>Política de Privacidad</h1>
        <p>
          En LegalAI, respetamos su privacidad y nos comprometemos a proteger
          sus datos personales. Esta Política de Privacidad describe cómo
          recopilamos, utilizamos y compartimos su información cuando utiliza
          nuestra aplicación web. Al utilizar LegalAI, usted acepta la
          recopilación y el uso de su información de acuerdo con esta política.
        </p>

        <h3>1. Información que Recopilamos</h3>
        <p>
          1.1. Información de Registro: Cuando crea una cuenta en LegalAI,
          podemos recopilar información como su nombre, dirección de correo
          electrónico y contraseña.
        </p>
        <p>
          1.2. Información de Uso: Recopilamos información sobre cómo utiliza
          LegalAI, como las consultas de búsqueda que realiza y las páginas que
          visita.
        </p>

        <h3>2. Uso de la Información</h3>
        <p>
          2.1. Utilizamos la información recopilada para proporcionar y mejorar
          nuestros servicios, incluyendo la personalización de su experiencia y
          la optimización de LegalAI.
        </p>
        <p>
          2.2. No compartimos su información personal con terceros, excepto
          cuando sea necesario para cumplir con la ley o proteger nuestros
          derechos.
        </p>

        <h3>3. Cookies y Tecnologías Similares</h3>
        <p>
          3.1. Utilizamos cookies y tecnologías similares para recopilar
          información sobre su interacción con LegalAI y mejorar su experiencia
          de usuario.
        </p>
        <p>
          3.2. Puede configurar su navegador para rechazar todas las cookies o
          para indicar cuándo se está enviando una cookie. Sin embargo, si
          desactiva las cookies, es posible que algunas funciones de LegalAI no
          funcionen correctamente.
        </p>

        <h3>4. Seguridad de la Información</h3>
        <p>
          4.1. Implementamos medidas de seguridad para proteger su información
          contra accesos no autorizados, divulgación o destrucción.
        </p>
        <p>
          4.2. Sin embargo, tenga en cuenta que ninguna transmisión de datos por
          Internet o almacenamiento electrónico es 100% segura, y no podemos
          garantizar la seguridad absoluta de su información.
        </p>

        <h3>5. Cambios en la Política de Privacidad</h3>
        <p>
          5.1. Nos reservamos el derecho de modificar esta Política de
          Privacidad en cualquier momento. Cualquier cambio será efectivo
          inmediatamente después de su publicación en esta página.
        </p>

        <h3>6. Contacto</h3>
        <p>
          6.1. Si tiene alguna pregunta o inquietud sobre nuestra Política de
          Privacidad, no dude en ponerse en contacto con nosotros a través de{" "}
          <a href="mailto:legalai@legalai.com">legalai@legalai.com</a>.
        </p>
      </Container>
      <Footer />
    </>
  );
};

export default Privacy;
