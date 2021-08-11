import { FunctionalComponent, h } from 'preact';
import style from './style.css';
import { v4 as uuid } from 'uuid';
import {PackInfo, PackStatus} from '../../../typings/common'
import { useEffect, useState } from 'preact/hooks';
import Pack from '../../components/pack'


const Home: FunctionalComponent = () => {

    const [packs, setPacks] = useState([] as PackInfo[]);

    useEffect(() => {
        fetch("/api/packs")
          .then(res => res.json())
          .then(
            (result) => {
              setPacks(result?.data?.packs ?? []);
            },
            (error) => {
            }
          )
      }, [])
      
    return (
        <div class={style.home}>
            {packs.map(pack=>(
                <Pack pack={pack} />
            ))}
        </div>
    );
};

export default Home;
