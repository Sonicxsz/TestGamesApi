import styled from 'styled-components';
import { H1 } from '../../common/layout/layout';
import { device } from '../../common/utils/size';
import { Pc, Ps, Xb, Nt } from '../../public/icons';


function AboutComponent(props) {
    const {result, fullText, setFullText} = props;
    const { name, description_raw, platforms } = result;
    const FilterIcons = [{name: 'PC', comp:<Pc key={1} />}, {name: 'PlayStation 4', comp:<Ps key={2} />}, {name: 'Xbox One',comp:<Xb key={3} />}, {name:'Nintendo Switch',comp:<Nt key={4} />}];
  
    let platform = platforms.map(i => i.platform.name)

    

    platform = [...new Set(platform)];

    return (
        <>
            <About>
                <H2>{name}</H2>
                <Platforms>
                    {FilterIcons.map(i => {
                      return platform.includes(i.name) && i.comp
                    })}
                </Platforms>
                <Text>
                    <H3>About</H3>
                    <Title fullText={fullText}>{description_raw}</Title>
                    {description_raw.length < 300 
                        ? null 
                        : <ButtonMore onClick={() => setFullText(!fullText)}>{fullText ? 'Hide text' : 'Read more'}</ButtonMore>}
                </Text>
            </About>
        </>
    )
}


const About = styled.div`
    width: 100%;
    grid-area: about;
    
`
const H2 = styled(H1)`
  grid-area:H2;
  font-size:20px;
  @media(${device.laptop}){
    font-size:40px;
  }  
  @media(${device.laptopL}){
    font-size:60px;
  }

`




const ButtonMore = styled.button`
display: flex;
align-items:center;
justify-content:center;
position:absolute;
top: 101%; 
left: 95%;
transform: translateX(-100%);
z-index: 999;
font-size:12px;
width: 80px;
height: 20px;
background-color: white;
border: unset;
color:black;
border-radius: 1px;
transition: all 0.2s linear;

:hover{
    background-color: rgb(94, 171, 247);
}
:active{
    background-color: rgb(20, 126, 233);
}
`
const Title = styled.span`
  display:block;
  max-height: ${props => props.fullText ? '600px' : '110px'};
  font-size:17px;
  position:relative;
  overflow:hidden;
  transition: all 0.2s ease;
  background-color:#151515bd;
  border-radius: 10px;
  padding: 10px 10px;
  
`

const Text = styled.div`
  position:relative;
`

const H3 = styled(H2)`
  font-size: 40px;
  margin-bottom: 0;

`
const Platforms = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    padding: 0 2rem;

`

export default AboutComponent