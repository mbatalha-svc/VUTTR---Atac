import '../../assets/stylesheets/Popup.css';

interface IPopupProps {
    title?:string,
    children?:any,
    trigger:boolean,
    setTrigger:any,
}

const Popup = (props:IPopupProps) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>{props.title}</h2>
                <button className="close-btn" onClick={
                    () => props.setTrigger(false)
                }>close</button>
                
                {props.children}
            </div>
        </div>
    ): (<></>);
}

export default Popup;