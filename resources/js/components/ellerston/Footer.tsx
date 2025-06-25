import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', () => {
    gsap.fromTo(
        '.foot_link',
        { opacity: 0, y: 80 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.3,
            delay: 1,
        },
    );
});
function Footer() {
    return (
        <footer className="footer absolute right-0 bottom-[40px] left-0 z-10">
            <div className="mx-auto flex w-[868px] text-center text-[14px] leading-[24px] tracking-[12%] text-white uppercase">
                <div className="foot_link flex-4/12">
                    <Link
                        href="/"
                        className="border-b-[1px] border-solid border-[#ffffff00] text-white transition duration-300 ease-in-out ease-linear hover:border-[#fff]"
                    >
                        PRIVACY POLICY
                    </Link>
                </div>
                <div className="foot_link flex-4/12">©ELLERSTON, 2025</div>
                <div className="foot_link flex-4/12">
                    <Link
                        href="/"
                        className="border-b-[1px] border-solid border-[#ffffff00] text-white transition duration-300 ease-in-out ease-linear hover:border-[#fff]"
                    >
                        information
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
