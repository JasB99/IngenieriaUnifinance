//clase para definir un boton - CTA
interface ButtonProps {
  style: string;
  text: string;
}
export default function Button(props: ButtonProps) {
  return <button className={props.style}>{props.text}</button>;
}
