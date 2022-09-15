import React, { useState, useMemo }  from 'react';
import { SketchPicker } from 'react-color';
import styles from './ColorPicker.module.css';
import axios from 'axios';

const decimalToHex = (alpha) =>
  alpha === 0 ? '00' : Math.round(255 * alpha).toString(16);


export default function ChangeColor(props){
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState(props.color)
    const [users, setUsers] = useState(null)

    console.log(props.color)

    const newColor = (hexColor) => { //PATCHを利用しデータベースの値を変更する関数
        axios
        .patch('http://localhost:8000/api/group/' + props.id + '/',
            {color: hexColor} //変更したいキーと値
        ,{
            headers: {
                // 'Authorization': `JWT ${localStorage.getItem('access')}`, 
                'Authorization': `JWT ${window.localStorage.getItem('access')}`
            }
        })
        .then(res=>{setUsers(res.data);
                    console.log(res.data);
                    console.log('patch完了');    
                })
        .catch(err=>{
            console.log(err);
            console.log('patch失敗');
        });
    }

    const hexColor = useMemo(() => {
        if (typeof color === 'string') {
          return color;
        }
        return `${color?.hex}${decimalToHex(color?.rgb?.a)}`;
      }, [color]);

      console.log(hexColor)

    const handleOpen = () => {
        setOpen(!open)
    } 

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>    
        <div className={styles.bar} onClick={handleOpen}>
        <div className={styles.barRight} style={ { background: hexColor } }></div>
        </div>
        {open && (
          <div className={styles.pikker}>
            {/* 背景クリック用の領域確保 */}
            <div className={styles.pikkerBack} 
            onClick={() => {
                            newColor(hexColor);
                            handleClose();
                            }}></div>
            <SketchPicker
               color={hexColor}
              onChange={setColor}
            />
          </div>
        )}
      </>
    )
}