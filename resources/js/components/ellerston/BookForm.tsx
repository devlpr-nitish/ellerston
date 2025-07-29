
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useState } from 'react';
import { button_style, feild_class, h1_class, h3_class, label_full, mb24 } from './CssClasses';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

type Props = {
    onSuccess: () => void;
};

function BookForm({ onSuccess }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        code: '+61',
        telephone_number: '',
        group_size: '',
        referred_by: '',
        acceptPolicy: false,
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline();
                tl.fromTo(
                    '.form_bg',
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        delay: 0.1,
                    },
                );

                tl.fromTo(
                    '.bg-black-light',
                    { y: '-95%' },
                    {
                        y: '0%',
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                );

                gsap.utils.toArray<HTMLElement>('.fade-effect').forEach((box) => {
                    tl.fromTo(
                        box,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.2,
                            ease: 'power3.out',
                        },
                    );
                });

                ScrollTrigger.create({
                    trigger: '.book-form-content',
                    // start: 'top+=100 center',
                    start: 'top 5%',
                    // end: '+=5%',
                    end: "bottom 80%",
                    animation: tl,
                    toggleActions: 'restart none restart none',
                    invalidateOnRefresh: true,
                    markers: false,
                    onEnter: () =>
                        gsap.to('.book-form-content', {
                            opacity: 1,
                            duration: 0.4,
                            ease: 'power2.out',
                        }),
                    onLeave: () =>
                        gsap.to('.book-form-content', {
                            opacity: 0,
                            duration: 0.4,
                            ease: 'power2.in',
                        }),
                    onLeaveBack: () =>
                        gsap.to('.book-form-content', {
                            opacity: 0,
                            duration: 0.4,
                            ease: 'power2.in',
                        }),
                    onEnterBack: () =>
                        gsap.to('.book-form-content', {
                            opacity: 1,
                            duration: 0.4,
                            ease: 'power2.out',
                        }),
                });

                ScrollTrigger.refresh();
            });
            return () => {
                ctx.revert();
            };
        }, 50);
        return () => {
            clearTimeout(timeout);
            // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

        console.log('Posting data:', formData);
        onSuccess();
    };

    return (
        <section id="book_form" className="form_wrap section w-full items-center bg-black">
            <div className="book-form-content relative py-[144px]">
                <div className="form_bg absolute top-0 left-0 z-0 h-full w-full"></div>

                <div className="from_container relative z-10 mx-auto max-w-[856px] px-[110px] py-[120px]">
                    <span className="bg-black-light"></span>

                    {/* <span className="bg-black-light absolute inset-0 z-[-1]"></span> */}

                    <div className="px-[16px]">
                        <h1 className={h1_class + ' fade-effect mb-[24px] text-center'}>ELLERSTON GOLF</h1>
                        <h3 className={h3_class + ' fade-effect mb-[24px] text-center'}>
                            To arrange your visit to Ellerston, please fill out your details below and the team will be in touch.
                        </h3>

                    </div>

                    <form onSubmit={handleSubmit} className="fromstyle">
                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="name" className={label_full}>NAME</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="ENTER YOUR NAME"
                                className={feild_class}
                            />
                        </div>

                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="email" className={label_full}>EMAIL</label>
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
                                <label htmlFor="code" className={label_full}>CODE</label>
                                <select
                                    name="code"
                                    onChange={handleChange}
                                    value={formData.code}
                                    className={feild_class + ' block appearance-none'}
                                >
                                    <option value="+61">+61 (Australia)</option>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                </select>
                            </div>
                            <div className="flex-10/12">
                                <label htmlFor="telephone_number" className={label_full}>PHONE</label>
                                <input
                                    type="tel"
                                    name="telephone_number"
                                    value={formData.telephone_number}
                                    onChange={handleChange}
                                    placeholder="ENTER PHONE NUMBER"
                                    className={feild_class}
                                />
                            </div>
                        </div>

                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="group_size" className={label_full}>GROUP SIZE</label>
                            <select
                                name="group_size"
                                onChange={handleChange}
                                value={formData.group_size}
                                className={feild_class + ' block appearance-none'}
                            >
                                <option value="">SELECT FROM DROPDOWN</option>
                                {[...Array(13)].map((_, i) =>
                                    <option key={i + 1} value={i + 1}>{i < 12 ? i + 1 : '13+'}</option>
                                )}
                            </select>
                        </div>

                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label htmlFor="referred_by" className={label_full}>REFERRED BY</label>
                            <input
                                type="text"
                                name="referred_by"
                                value={formData.referred_by}
                                onChange={handleChange}
                                placeholder="ENTER NAME OR CODE"
                                className={feild_class}
                            />
                        </div>

                        <div className={mb24 + ' fade-effect gap-[24px]'}>
                            <label className="custom_checkbox">
                                <input
                                    type="checkbox"
                                    name="acceptPolicy"
                                    checked={formData.acceptPolicy}
                                    onChange={handleChange}
                                />
                                <span className="checkbox"></span>
                                <span>
                                    By submitting this form, you agree to our Privacy Policy.{' '}
                                    <Link href="">Read Privacy Policy here</Link>
                                </span>
                            </label>
                        </div>

                        <div className="fade-effect pt-[24px] text-center">
                            <button type="submit" className={button_style + ' btn_arrow m-auto'}>
                                <span>
                                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <path
                                            d="M12.8827 7.42301H0.923C0.799833 7.42301 0.6985 7.38335 0.619 7.30401C0.539667 7.22451 0.5 7.12309 0.5 6.99976C0.5 6.87643 0.539667 6.77509 0.619 6.69576C0.6985 6.61659 0.799833 6.57701 0.923 6.57701H12.8827L7.19675 0.903762C7.12408 0.821096 7.08275 0.723512 7.07275 0.611012C7.06275 0.498512 7.10475 0.397095 7.19875 0.306762C7.29275 0.210429 7.39317 0.161929 7.5 0.161262C7.60683 0.160595 7.70725 0.207261 7.80125 0.301261L13.99 6.49001C14.0642 6.56418 14.1204 6.64268 14.1587 6.72551C14.1969 6.80818 14.216 6.90026 14.216 7.00176C14.216 7.1031 14.1969 7.19459 14.1587 7.27626C14.1204 7.35793 14.0642 7.43584 13.99 7.51001L7.80125 13.6988C7.72142 13.7786 7.62542 13.8218 7.51325 13.8283C7.40092 13.8346 7.29608 13.7914 7.19875 13.6988C7.10475 13.6013 7.05775 13.4997 7.05775 13.394C7.05775 13.2882 7.10475 13.1925 7.19875 13.107L12.8827 7.42301Z"
                                            fill=""
                                        />
                                    </svg>
                                    Submit
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

export default BookForm;
