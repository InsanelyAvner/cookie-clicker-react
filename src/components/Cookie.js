import styles from "../App.module.css";
import cookie from "../img/cookie.jpg";

function Cookie(props) {
  const round = (num) => {
    return Number((Math.round(num * 10) / 10).toFixed(1));
  };

  const clickHandler = () => {
    props.sPoints(props.pts + round(props.multi * props.cookieMulti));
  };

  return (
    <div onClick={clickHandler} onContextMenu={clickHandler}>
      <img
        src={cookie}
        className={`${styles.logo} ${styles.noselect} ${
          props.cookieMulti === 2
            ? styles.v2
            : props.cookieMulti === 3
            ? styles.v3
            : props.cookieMulti >= 4
            ? styles.v4
            : ""
        }`}
        onContextMenu={(e) => e.preventDefault()}
        alt="Cookie"
      />
    </div>
  );
}

export default Cookie;
