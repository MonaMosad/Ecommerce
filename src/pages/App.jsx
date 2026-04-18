import Header from '../component/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'
import CartDrawer from '../component/CartDrawer'
import { Toaster } from 'react-hot-toast'

function Master(){ 
    return (
        <>
            <Toaster position="top-right" toastOptions={{ style: { borderRadius: 12, fontSize: 14, fontWeight: 600 } }} />
            <Header />
            <CartDrawer />
            <Outlet />
            <Footer />
        </>
    )
}
export default Master;
