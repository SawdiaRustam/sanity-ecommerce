import { Product } from '@/components';
import { client, urlFor } from '@/lib/client';
import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar,AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';
const ProductDetails = ({products,productquery}) => {
    const [index,setIndex] = useState(0)
    const {image,name,details,price} = products;
    const {decQty, incQty,qty,onAdd} = useStateContext();
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])}
                      className="product-detail-image"
                    />
                </div>
                <div className='small-images-container'>
                    {image?.map((item,i)=>(
                        <img src={urlFor(item)}
                        className={i === index ? 'small-image selected-image':'small-image'}
                        onMouseEnter={()=> setIndex(i)}
                        />
                    ))}
                </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                <div>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                </div>
                <p>{20}</p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                        <span className='num'>{qty}</span>
                        <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button type='button' className='add-to-cart'  onClick={()=> onAdd(products,qty)}> Add to cart</button>
                    <button type='button' className='buy-now'  onClick={""}> Buy Now</button>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {productquery?.map((item)=>{
                        return(
                        <Product key={item._id} product={item}/>
                        )
                         } )}
                </div>
            </div>
        </div>



    </div>
  )
}


export const getStaticPaths = async () =>{
    const query = `*[type == "product"]{
        slug{
            current
        }
    }`;

    const products = await client.fetch(query);
    const paths = products.map((p)=>({
        params:{
            slug:p.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}






export const getStaticProps = async ({params:{slug}})=>{
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    const products = await client.fetch(query);
    const productquery = await client.fetch(productsQuery)

  
    return{
     props: {products,productquery}
    }
  }
export default ProductDetails