import styled from 'styled-components'

export const Sidebar = styled.aside `
    background:#000000;
    &.sidenav{
        width:82px;
        transition:0.6s;
        &.open{
            width:240px;
            transition:0.6s;
            ul{
                li{
                    a{
                        color:#fff;
                        font-size:16px;
                        font-weight:400;
                        padding:15px;
                        svg{
                            margin-right:18px;
                        }
                        &:hover{
                            background:#EB2B2C;
                            border-radius:50px;
                        }
                    }
                }
            }
        }
        ul{
            li{
                a{
                    font-size:0;
                    height:54px;
                    &:hover{
                        background:#EB2B2C;
                        border-radius:50px;
                    }
                }
            }
        }
    }
    ul{
        margin-top:40px;
        li{
            width:100%;
            padding:0 15px;  
            margin:0 0 15px;              
            a{
                display: flex;
                align-items:center;
                &.active{
                    background:#EB2B2C;
                    border-radius:50px;
                }
            }
        }
    }

`;