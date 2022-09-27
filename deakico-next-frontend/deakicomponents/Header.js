import React from "react";
import style from "./Header.module.css"
import Image from 'next/image'

function Header (props) {
        return (
            <header className={style.container}>
                <div className={style.deakico}>
                    <Image 
                    src="/Coqui.PNG"
                    height={45}
                    width={65}
                    />
                    <div>Deakico.</div>
                </div>
            </header>
        );
    
}
export default Header;