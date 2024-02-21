import { useState } from 'react';
import './CollapsibleList.css'; // You can define your CSS styles in this file

function CollapsibleList() {
    const items = [
        {
            title: 'Click to expand',
            content: (
                <ul className="list">
                    <li>
                        <strong>1. Bulletproof Protection:</strong> 
                        Your first line of defense against cyberattacks starts with a strong password. A highly secure password generator ensures that your credentials are virtually impenetrable, thwarting even the most sophisticated hacking attempts.
                    </li>
                    <li>
                        <strong>2. Randomized Complexity:</strong> 
                        Forget about predictable patterns or easily guessable combinations. Our generator crafts passwords with a randomized mix of characters, including uppercase and lowercase letters, numbers, and symbols, maximizing complexity to fortify your accounts.
                    </li>
                    <li>
                        <strong>3. Unique to You:</strong> 
                        Every generated password is unique, tailored to your specific security needs. This means no more recycled or reused passwords across multiple accounts, significantly reducing the risk of a domino effect if one account is compromised.
                    </li>
                    <li>
                        <strong>4. Peace of Mind:</strong> 
                        Rest easy knowing that your sensitive information is shielded behind an unbreakable barrier. With a highly secure password generator, you can navigate the digital landscape with confidence, knowing that your online identity remains protected at all times.
                    </li>
                    <li>
                        <strong>5. Effortless Convenience:</strong> 
                        Gone are the days of struggling to come up with strong passwords or memorizing complex strings of characters. Our generator automates the process, providing you with robust passwords at the click of a button, saving you time and frustration.
                    </li>
                </ul>
            )
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleCollapsible = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='collapsible-container'>
            <div className="collapsible-list">
                {items.map((item, index) => (
                    <div key={index}>
                        <button
                            className={`collapsible ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleCollapsible(index)}
                        >
                            {item.title}
                        </button>
                        <div className={`content ${activeIndex === index ? 'active' : ''}`}>
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CollapsibleList;