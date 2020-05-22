import styled from 'styled-components'
import bg from '../../images/download.png';

export const DashboardWrap = styled.div `
    flex:1;
    padding:20px;
    background:#F2F2F2;
    h2{
        font-size:20px;
        margin:0 0 10px;
        color:#000000;
        font-weight:700;
    }
    .processData{
        border-radius:10px;
        background-image: url(${bg});
        background-blend-mode: overlay;
        background-color: rgba(0,0,0,0.7);
        span{
            font-size:16px;
            font-weight:300;
            text-align: right;
            border-right: 1px solid #707070;
            padding-right: 20px;
            line-height: 22px;
            color:#fff;
            strong{
                width:100%;
                font-size:22px;
                display: inline-block;
            }
        }
        .nav{
            margin-left:15px;
            li{
                a{
                    color:#fff;
                    padding:10px 30px;
                    border-radius:50px;
                    font-size:12px;
                    font-weight:500;
                    &.active{
                        background:#EB2B2C;
                    }
                }
            }
        }
        ul.circle{
            display:flex;
            margin:0;
            padding:30px;
            justify-content:space-between;
            li{
                width: 126px;
                display:flex;
                flex-flow:wrap column;
                align-items:center;
                p{
                    font-size:12px;
                    color:#fff;
                    font-weight:500;
                    margin-top:10px;
                }
            }
        }
    }
`;