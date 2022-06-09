import React from "react";
import Form from "../Form/Form";
import { BrandFacebook } from 'tabler-icons-react';
import { BrandTwitter } from 'tabler-icons-react';
import { BrandInstagram } from 'tabler-icons-react';
import { BrandPinterest } from 'tabler-icons-react';
import { BrandYoutube } from 'tabler-icons-react';
import './Footer.scss'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className='footerContainer'>
                <Form />
                <div className='socialsContainer'>
                    <a href='https://uk-ua.facebook.com/' target='_blank'><BrandFacebook size={40} color="white" /></a>
                    <a href='https://twitter.com/?lang=uk' target='_blank'><BrandTwitter size={40} color="white" /></a>
                    <a href='https://www.instagram.com/' target='_blank' ><BrandInstagram size={40} color="white" /></a>
                    <a href='https://www.pinterest.com/' target='_blank'><BrandPinterest size={40} color="white" /></a>
                    <a href='https://www.youtube.com/' target='_blank'><BrandYoutube size={40} color="white" /></a>

                </div>
            </div>
        )
    }

}
export default Footer