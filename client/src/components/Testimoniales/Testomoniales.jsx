import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logeduser, postTestimonials } from '../../actions';
import style from './Testimoniales.module.css';
import ReactStars from "react-rating-stars-component";


const Testimoniales = () => {
    const [ver, setVer] = useState(false);

    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        description: '',
    })
    useEffect(() => {
        dispatch(Logeduser());
    }, [dispatch]);
    const logeduser = useSelector((state) => state.user);
    const token = logeduser && logeduser.token;


    const { name, description, } = input;
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

    }
    const [stars, setStars] = useState(0);
    const ratingChanged = (stars) => {
        setStars(stars)
    }
    const handleClicks = (e) => {
        e.preventDefault();
        dispatch(postTestimonials({ ...input, stars }, { token }));
        // history.push("/testimonial");
        alert('Tu reseña a sido enviada con éxito. Te esperamos de vuelta pronto. Muchas gracias.');
        setVer(false);
    }


    return (
        <div className={style.testimonial}>
            <button onClick={() => { setVer(!ver) }} className={style.contanos}>Contanos cómo te fue</button>
            {
                ver &&
                <div className={style.formCont}>
                    <div className={style.tarjeta}>
                        <button onClick={() => { setVer(!ver) }} className={style.x}>x</button>
                        <h2>Contanos tu experiencia</h2>
                        <form className={style.container}>

                            <label>Nombre :</label>
                            <input
                                type="text"
                                placeholder='Dejanos tu nombre . . .'
                                name="name"
                                value={name}
                                maxLength="20"
                                minLength="5"
                                onChange={handleChange} 
                                required/>
                            <label>Reseña :</label>
                            <textarea
                                placeholder='Contanos cómo la pasaste . . .'
                                cols="30"
                                rows="10"
                                name="description"
                                maxlength="255"
                                value={description}
                                onChange={handleChange}
                                required>
                            </textarea>
                            <div id={style.star}>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={30}
                                    activeColor="#ffd700"
                                />
                            </div>


                            <button onClick={(e) => handleClicks(e)} className={style.btn}>Enviar</button>

                        </form>
                    </div>
                </div>

            }

        </div>
    );
}

export default Testimoniales;