import styled from 'styled-components';
export const FooterDiv = styled.div`

height:40px;
line-height:40px;
padding:0 10px;
position:fixed;
bottom:0;
width:100%;
left:0;
background-color:#0a453d;
overflow:hidden;
color:#fff;
.version{

}
.right-desc{
    float:right;
    .right_three_left{
        clear:both;
        display:inline-block;    
    }
    .three{
       height:28px;
       width:28px;
       line-height:28px;
       text-align:center; 
       display:inline-block;
       margin-left:10px;
       background-color:rgba(255,255,255,.15);
       border-radius:4px;
       font-family:youshe;
       text-decoration: underline;
    }

}
`