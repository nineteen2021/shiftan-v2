import React from 'react';
import { SketchPicker } from 'react-color';
import styles from './ColorPicker.module.css';


class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      color: '#FFF',
    }
  }

  handleChange = color => {
    // 第一引数のcolorで選択したカラー情報を取得することができます。
    this.setState({ color: color.hex })
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <>    
        <div className={styles.bar} onClick={this.handleOpen}>
        <div className={styles.barRight} style={ { background: this.state.color } }></div>
        </div>
        {this.state.open && (
          <div className={styles.pikker}>
            {/* 背景クリック用の領域確保 */}
            <div className={styles.pikkerBack} onClick={this.handleClose}></div>
            <SketchPicker
              color={ this.state.color }
              onChange={ this.handleChange }
            />
          </div>
        )}
      </>
    );
  }
}

export default ColorPicker
