export function Button(props: {
  classname: string;
  text: string;
  onclickFunction?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}) {
  return (
    <button
      type={props.type}
      className={props.classname}
      onClick={props.onclickFunction}
    >
      {props.text}
    </button>
  );
}
