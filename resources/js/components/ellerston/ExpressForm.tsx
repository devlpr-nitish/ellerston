import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import { button_style, feild_class, h1_class, h3_class, label_full, mb24, p_sm_class } from './CssClasses';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.fromTo(
        '.form_bg',
        { opacity: 0, y: 150 },
        {
            opacity: 1,
            y: 0,
            duration: 2,
        },
    );
    ScrollTrigger.create({
        animation: tl,
        trigger: '.form_wrap',
        // pin: true,
        //pinSpacing: false,
        scrub: true,
        start: 'top 98%',
        end: '10% 80%',
        //markers: true,
    });
});
function ExpressForm() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (section) {
            const rows = section.querySelectorAll('.fade-effect');

            gsap.set(rows, { opacity: 0, y: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top center+=50',
                    end: 'bottom 85%',
                    //pin: true,
                    scrub: true,
                    markers: false,
                },
            });

            rows.forEach((row, index) => {
                tl.to(row, { opacity: 1, y: 0, duration: 1 }, '+=0.2');
            });
        }

        gsap.fromTo(
            '.bg-black-light',
            { y: '-105%', duration: 0.5 },
            {
                y: '0%',
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    end: '+=5%',
                    toggleActions: 'play none none reverse', // optional
                    markers: false, // optional, for debugging
                },
            },
        );
    }, []);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        code: '',
        telephone_number: '',
        location: '',
        handicap: '',
        group_size: '',
        purpose_of_visit: '',
        current_memberships: '',
        acceptPolicy: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.acceptPolicy) {
            alert('You must accept the Terms and Conditions to submit the form.');
            return;
        }

        console.log('Form submitted:', formData);
        alert('Form submitted successfully! Check the console for data.');
    };
    return (
        <section className="section w-full items-center bg-black">
            <div className="form_wrap relative py-[144px]">
                <div className="form_bg absolute top-0 left-0 z-0 h-full w-full"></div>

                <div ref={sectionRef} className="from_container relative z-10 mx-auto max-w-[856px] px-[110px] py-[120px]">
                    <span className="bg-black-light"></span>
                    <h1 className={h1_class + ' fade-effect mb-[24px]'}>CLASSIC EXPERIENCE</h1>
                    <h3 className={h3_class + ' fade-effect mb-[24px] text-center'}>
                        To express interest for the waitlist please enter details below.
                    </h3>
                    <p className={p_sm_class + ' fade-effect mx-auto max-w-[500px] text-center uppercase'}>
                        The CLASSIC experience starts at $25,000 AUD per guest (Minimum of 4 guests per group)
                    </p>
                    <hr className="fade-effect my-[48px] h-[1px] bg-white" />

                    <form onSubmit={handleSubmit} className="fromstyle">
                        <div className={mb24 + ' fade-effect flex gap-[24px]'}>
                            <div className="flex-1/2">
                                <label htmlFor="firstname" className={label_full}>
                                    FIRST NAME
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="ENTER FIRST NAME"
                                    className={feild_class}
                                />
                            </div>
                            <div className="flex-1/2">
                                <label htmlFor="lastname" className={label_full}>
                                    Last NAME
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="ENTER LAST NAME"
                                    className={feild_class}
                                />
                            </div>
                        </div>
                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="email" className={label_full}>
                                EMAIL
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className={feild_class}
                            />
                        </div>
                        <div className={mb24 + ' fade-effect flex gap-[24px]'}>
                            <div className="flex-2/12">
                                <label htmlFor="code" className={label_full}>
                                    Code
                                </label>
                                <div className="relative">
                                    <select
                                        name="code"
                                        onChange={handleChange}
                                        value={formData.code}
                                        className={feild_class + 'block appearance-none'}
                                    >
                                        <option value="+00">+00</option>
                                        <option value="+01">+01</option>
                                        <option value="+91">+91</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-10/12">
                                <label htmlFor="telephone_number" className={label_full}>
                                    Telephone Number
                                </label>
                                <input
                                    type="tel"
                                    name="telephone_number"
                                    value={formData.telephone_number}
                                    onChange={handleChange}
                                    placeholder="ENTER NUMBER"
                                    className={feild_class}
                                />
                            </div>
                        </div>
                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="location" className={label_full}>
                                LOCATION
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="ENTER TOWN OR CITY"
                                className={feild_class}
                            />
                        </div>
                        <div className={mb24 + ' fade-effect flex gap-[24px]'}>
                            <div className="flex-6/12">
                                <label htmlFor="handicap" className={label_full}>
                                    HANDICAP
                                </label>
                                <div className="relative">
                                    <select
                                        name="handicap"
                                        onChange={handleChange}
                                        value={formData.handicap}
                                        className={feild_class + 'block appearance-none'}
                                    >
                                        <option value="">SELECT FROM DROPDOWN </option>
                                        <option value="Option one">Option one</option>
                                        <option value="Option Two">Option Two</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-6/12">
                                <label htmlFor="group_size" className={label_full}>
                                    GROUP SIZE
                                </label>
                                <div className="relative">
                                    <select
                                        name="group_size"
                                        onChange={handleChange}
                                        value={formData.group_size}
                                        className={feild_class + 'block appearance-none'}
                                    >
                                        <option value="">SELECT FROM DROPDOWN</option>
                                        <option value="Option one">Option one</option>
                                        <option value="Option Two">Option Two</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="purpose_of_visit" className={label_full}>
                                PURPOSE OF VISIT
                            </label>
                            <textarea
                                name="purpose_of_visit"
                                value={formData.purpose_of_visit}
                                onChange={handleChange}
                                placeholder="(MAX 250 WORDS)"
                                className={feild_class + ' min-h-[124px]'}
                            ></textarea>
                        </div>
                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="current_memberships" className={label_full}>
                                CURRENT MEMBERSHIPS
                            </label>
                            <input
                                type="text"
                                name="current_memberships"
                                value={formData.current_memberships}
                                onChange={handleChange}
                                placeholder="ENTER NOTABLE GOLF CLUBS"
                                className={feild_class}
                            />
                        </div>
                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label className="custom_checkbox">
                                <input type="checkbox" name="acceptPolicy" checked={formData.acceptPolicy} onChange={handleChange} />
                                <span className="checkbox"></span>
                                <span>
                                    By submitting this form, you agree to our Privacy Policy, which outlines how we store and use your data.{' '}
                                    <Link href="">Read Privacy Policy here</Link>
                                </span>
                            </label>
                        </div>
                        <div className="fade-effect pt-[24px]">
                            <button type="submit" className={button_style + ' btn_arrow m-auto'}>
                                <span>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.8827 7.42301H0.923C0.799833 7.42301 0.6985 7.38335 0.619 7.30401C0.539667 7.22451 0.5 7.12309 0.5 6.99976C0.5 6.87643 0.539667 6.77509 0.619 6.69576C0.6985 6.61659 0.799833 6.57701 0.923 6.57701H12.8827L7.19675 0.903762C7.12408 0.821096 7.08275 0.723512 7.07275 0.611012C7.06275 0.498512 7.10475 0.397095 7.19875 0.306762C7.29275 0.210429 7.39317 0.161929 7.5 0.161262C7.60683 0.160595 7.70725 0.207261 7.80125 0.301261L13.99 6.49001C14.0642 6.56418 14.1204 6.64268 14.1587 6.72551C14.1969 6.80818 14.216 6.90026 14.216 7.00176C14.216 7.1031 14.1969 7.19459 14.1587 7.27626C14.1204 7.35793 14.0642 7.43584 13.99 7.51001L7.80125 13.6988C7.72142 13.7786 7.62542 13.8218 7.51325 13.8283C7.40092 13.8346 7.29608 13.7914 7.19875 13.6988C7.10475 13.6013 7.05775 13.4997 7.05775 13.394C7.05775 13.2882 7.10475 13.1925 7.19875 13.107L12.8827 7.42301Z"
                                            fill=""
                                        />
                                    </svg>
                                    Register interest
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </section>
    );
}
export default ExpressForm;
