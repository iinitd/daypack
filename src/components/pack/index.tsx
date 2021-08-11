import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { ItemInfo, PackInfo } from '../../../typings/common';
import style from './style.css';

interface Props {
    pack: PackInfo;
}

const Pack: FunctionalComponent<Props> = (props: Props) => {

    const {pack} = props

    const [items, setItems] = useState([] as ItemInfo[]);

    useEffect(() => {
        fetch(`/api/items/?packId=${pack.id}`)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
                setItems(result?.data?.items ?? []);
            },
            (error) => {
                setItems([]);
            }
          )
      }, [])

      const addItem = useCallback(async () => {
        fetch(`/api/item/add?packId=${pack.id}`)
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
                const item = result?.data?.item
                if(item && item.id) {
                    setItems(items=>[...items, item]);
                }
                
            },
            (error) => {
                setItems([]);
            }
          )
      }, [])

    return (
        <div>
            <h1 onClick={addItem}>{pack.title}</h1>
            {items.map(item=>(
                <div>{item.status}-{item.content}</div>
            ))}
        </div>
    );
};

export default Pack;
