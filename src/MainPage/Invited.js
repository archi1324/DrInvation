import React, { useState, useEffect } from "react"
import "./Invited.css"

const Invaited = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="main__container">
        <p className="main__text">IT`S MY BIRTH<br />DAY</p>
        <p className="main__date">08/02/2025</p>
        <div className="main__img"></div>
      </div>
      <div className="main__info">
        <h1 className="main__info_text">
          ДОРОГИЕ ДРУЗЬЯ, ПРИГЛАШАЮ ВАС НА СВОЙ ДЕНЬ РОЖДЕНИЯ !
        </h1>
        <h2 className="main__info_text_h2">
          Приходите вовремя и с прекрасным настроением!
        </h2>
        {screenWidth > 400 ? (<table className="main__info_table">
          <thead>
            <tr>
              <th >Когда?</th>
              <th >Где?</th>
              <th >Во сколько?</th>
            </tr>
          </thead>
          <tbody>
            <th> 08/02/2025</th>
            <th>ресторан Фрегат<br />
              г. Октябрьский ул. Садовое кольцо, 130</th>
            <th>18:00</th>
          </tbody>
        </table>) : (
          <div className="table-container">
            <p className="table">Когда?</p>
            <p className="table">08/02/2025</p>
            <p className="table">Где?</p>
            <p className="table">Pесторан Фрегат<br />г. Октябрьский ул. Садовое кольцо, 130</p>
            <p className="table">Во сколько?</p>
            <p className="table">18:00</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Invaited