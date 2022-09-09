import { RatingBlock } from '../gameItem/gameItem';
import styled from 'styled-components';


function Information(props) {
  const { metacritic, released, website, playtime, developers, publishers } = props.data;

  return (
    <InformationWrapper>
      <InformationBlock>
        <span>Metascore</span>
        <RatingBlock fz='20px' width='45px' height='35px'>{metacritic ? metacritic : 0}</RatingBlock>
      </InformationBlock>
      <InformationBlock>
        <span>Release date</span>
        <span>{released}</span>
      </InformationBlock>
      <InformationBlock>
        <span>Website: </span>
        <a href={website}>Go to website</a>
      </InformationBlock>
      <InformationBlock>
        <span>Playtime:</span>
        <span>{playtime} hours</span>
      </InformationBlock>
      <InformationBlock>
        <span>Delevelopers:</span>
        <span>{developers.length > 0 ?developers[0].name : "no Data"}</span>
      </InformationBlock>
      <InformationBlock>
        <span>Publisher:</span>
        {publishers.map((i) => {
          return <span style={{ display: 'inline' }} key={i.id}>{`${i.name} `}</span>
        })}
      </InformationBlock>
    </InformationWrapper>
  )
}

export default Information;

const InformationWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  width: 100%;
  height: auto;
  background-color:#151515e4;
  grid-area: information;
  border-radius: 10px;
  border:2px solid #6dc849;
  
`

const InformationBlock = styled.div`
  display:block;
  width: 50%;
  word-brek: break-all;
  padding: 10px 10px 10px 30px;
  span{
    display:${props => props.block ? props.block : 'block'};
    margin-bottom: 5px;
  };
  a{
    display:block;
    word-break: break-all;
    width: 100%;
    text-decoration: underline;
    font-size:15px;
  }
`


