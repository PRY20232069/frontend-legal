import { Container } from "@mui/material";
import Footer from "../components/shared/layout/footer/Footer";
const Terms = () => {
  return (
    <>
      <Container>
        <br />
        <h1 style={{ textAlign: "center" }}>Términos y Condiciones</h1>
        <p>
          Bienvenido a LegalAI, una aplicación web proporcionada por LegalAI
          S.A.C. Antes de utilizar nuestros servicios, lea detenidamente los
          siguientes términos y condiciones. El acceso y uso de LegalAI están
          sujetos a su aceptación y cumplimiento de estos términos. Al utilizar
          nuestra aplicación web, usted acepta estar legalmente vinculado por
          estos términos y condiciones. Si no está de acuerdo con alguno de
          estos términos, por favor no utilice LegalAI.
        </p>

        <h3>1. Uso del Servicio</h3>
        <p>
          1.1. LegalAI es una aplicación web destinada únicamente para la
          decodificación y comprensión de los términos y condiciones de
          contratos bancarios y financieros.
        </p>
        <p>
          1.2. Usted acepta utilizar LegalAI únicamente con fines legales y
          éticos. No utilice este servicio para actividades ilícitas o
          fraudulentas.
        </p>
        <p>
          1.3. LegalAI se reserva el derecho de modificar o suspender el
          servicio en cualquier momento sin previo aviso.
        </p>

        <h3>2. Propiedad Intelectual</h3>
        <p>
          2.1. Todos los derechos de propiedad intelectual de LegalAI,
          incluyendo pero no limitado a derechos de autor, marcas comerciales y
          patentes, pertenecen a LegalAI S.A.C.
        </p>
        <p>
          2.2. Usted acepta no reproducir, distribuir, modificar o crear
          trabajos derivados basados en LegalAI sin autorización expresa por
          escrito de LegalAI S.A.C.
        </p>

        <h3>3. Privacidad</h3>
        <p>
          3.1. LegalAI respeta su privacidad y se compromete a proteger sus
          datos personales de acuerdo con nuestra Política de Privacidad.
        </p>
        <p>
          3.2. Al utilizar LegalAI, usted acepta que LegalAI pueda recopilar y
          procesar ciertos datos personales de acuerdo con nuestra Política de
          Privacidad.
        </p>

        <h3>4. Limitación de Responsabilidad</h3>
        <p>
          4.1. LegalAI no se hace responsable de la precisión, integridad o
          actualidad de la información proporcionada a través de la aplicación
          web.
        </p>
        <p>
          4.2. Usted acepta que LegalAI no será responsable por cualquier daño
          directo, indirecto, incidental, especial, consecuente o punitivo que
          surja del uso o la imposibilidad de utilizar LegalAI.
        </p>

        <h3>5. Ley Aplicable y Jurisdicción</h3>
        <p>
          5.1. Estos términos y condiciones se rigen por las leyes de la
          República del Perú.
        </p>
        <p>
          5.2. Cualquier disputa relacionada con LegalAI se resolverá
          exclusivamente ante los tribunales competentes de la ciudad de Lima,
          Perú.
        </p>

        <h3>6. Modificaciones</h3>
        <p>
          6.1. LegalAI se reserva el derecho de modificar estos términos y
          condiciones en cualquier momento. Las modificaciones entrarán en
          vigencia inmediatamente después de su publicación en nuestra
          aplicación web.
        </p>
        <p>
          Al utilizar LegalAI, usted acepta cumplir con estos términos y
          condiciones. Si tiene alguna pregunta o inquietud sobre estos
          términos, no dude en ponerse en contacto con nosotros a través de{" "}
          <a href="mailto:legalai@legalai.com">legalai@legalai.com</a>.
        </p>
      </Container>
      <Footer />
    </>
  );
};

export default Terms;
