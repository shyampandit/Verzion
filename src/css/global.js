import {
    createGlobalStyle
} from 'styled-components';


export default createGlobalStyle `
    body{
        font-family: 'Roboto', sans-serif !important;
    }
    a#calander-tab {
	    color: #000;
	    font-size: 16px;
	    display: flex;
	    align-items: center;
	    padding: .5rem 1rem;
	    background: #fff;
	    border-radius: 32px;
	}
	img.svg-icon {
	    width: 16px;
	    margin-right: 7px;
	}
	
	.page-item.active .page-link {
		    z-index: 3;
		    color: #fff;
		    background-color: #eb2b2c !important;
		    border-color: #eb2b2c;
		}

`;