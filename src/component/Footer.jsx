import React from 'react'

export default function Footer() {
    return (
        <footer className='py-5 ' style={{ backgroundColor: '#f4f6f9', borderTop: '1px solid #e5e7eb' }}>
            <div className='container  '>
                <div className='row mt-4'>
                    <div className='col-md-4 mb-4'>
                        <h5 className='fw-bold mb-4' style={{ color: '#1a202c' }}>Shopix</h5>
                        <p className='text-secondary' style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Building the foundation for the digital<br />
                            renaissance. Precision instruments for the<br />
                            creators of tomorrow.
                        </p>
                    </div>

                    <div className='col-md-4 mb-4 '>
                        <h6 className='fw-bold text-uppercase mb-4' style={{ fontSize: '0.8rem', letterSpacing: '1px', color: '#4a5568' }}>Legal</h6>
                        <ul className='list-unstyled mb-5'>
                            <li className='mb-3 d-flex flex-column'>
                                <a href='#' className='text-secondary mb-2 text-decoration-none' style={{ fontSize: '0.9rem' }}>Terms of Service</a>
                              
                                <a href='#' className='text-secondary text-decoration-none' style={{ fontSize: '0.9rem' }}>Contact Us : [monamosad392@gmail.com]</a>
                                </li>
                        </ul>
                        <p className='text-secondary' style={{ fontSize: '0.85rem' }}>
                            &copy; 2026 Shopix Precision. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
