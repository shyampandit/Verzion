import styled from 'styled-components'

export const HeaderWrap = styled.nav `
    .logo{
        width:147px;    
    }
    button{
        background:none;
        border:none;
        outline:none;
    }
    nav{
        flex:1;
        li{
            border-right:1px solid #D5D5D5;
            display:flex;
            align-items:center;
            &.dropdown{
                width:250px;
                a:after{
                    display:none;
                }
                svg{
                    transition:0.6s;
                    transform:rotate(0deg);
                }
                &.show{
                    svg{
                        transform:rotate(180deg);
                        /* transform-origin:0 0; */
                        transition:0.6s
                    }
                }
                & div > div{
                    margin-left:16px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                p{
                    margin:0;
                    font-size:12px;
                    color:#020202;
                    width:100%;
                }
                strong{
                    font-size:16px;
                    letter-spacing:0.4px;
                    color:#020202;
                }
            }
            a{
                padding:5px 25px;
            }
        }
    }
`;