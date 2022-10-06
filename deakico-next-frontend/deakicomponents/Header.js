import React from "react";
import style from "./Header.module.css"
import Image from 'next/image'

function Header (props) {
        return (
            <div className={style.container}>
                <div className={style.deakico}>
                    <Image 
                    src="/Coqui.PNG"
                    height={45}
                    width={65}
                    />
                    <div>
                        <a href='/'>
                            Deakico.
                        </a>
                    </div>
                </div>
            </div>
        );
    
}
export default Header;