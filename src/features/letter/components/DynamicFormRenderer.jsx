// components/DynamicFormRenderer.jsx
import AhliWarisForm from "../components/AhliWarisForm";
import PengantarNikahForm from "../components/PengantarNikahForm";
import SuratIzinMenikahForm from "../components/SuratIzinMenikahForm";
import PersetujuanCalonPengantinForm from "../components/PersetujuanCalonPengantinForm";
import DomisiliYayasan from "../components/DomisiliYayasan";
import DomisiliPerusahaan from "../components/DomisiliPerusahaan";
import DomisiliSementara from "../components/DomisiliSementara";
import DomisiliTetap from "../components/DomisiliTetap";
import SktmForm from "../components/SktmForm";
import Sk from "../components/Sk";
import Kematian from "../components/Kematian";
import IzinOrtu from "../components/IzinOrtu";

const FORM_COMPONENTS = {
  AhliWarisForm,
  PengantarNikahForm,
  SuratIzinMenikahForm,
  PersetujuanCalonPengantinForm,
  DomisiliYayasan,
  DomisiliPerusahaan,
  DomisiliSementara,
  DomisiliTetap,
  SktmForm,
  Sk,
  Kematian,
  IzinOrtu
};

const DynamicFormRenderer = ({ 
  componentName, 
  applicant, 
  deceasedOptions, 
  onSearchDeceased,
  ...props 
}) => {
  const Component = FORM_COMPONENTS[componentName];
  
  if (!Component) {
    return null;
  }

  // Pass props berdasarkan kebutuhan komponen
  const componentProps = {
    ...props
  };

  // Tambahkan applicant jika diperlukan
  if (applicant) {
    componentProps.applicant = applicant;
  }

  // Tambahkan deceased options jika diperlukan
  if (deceasedOptions) {
    componentProps.options = deceasedOptions;
    componentProps.onSearch = onSearchDeceased;
  }

  return <Component {...componentProps} />;
};

export default DynamicFormRenderer;