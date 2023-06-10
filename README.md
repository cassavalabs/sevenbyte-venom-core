# SevenByte

An NFT marketplace on the Venom blockchain

SevenByte is a peer-to-peer marketplace for buying, selling, and trading non-fungible tokens (NFTs). NFTs are unique digital assets that can represent ownership or proof of authenticity for various types of digital content, such as artwork, collectibles, virtual real estate, in-game items and more.

SevenByte is tending to provide a valuable platform to both creators and collators. It offers creators the opportunity to showcase and sell their artistic work to global audience, while collators can utilize the platform to discover and acquire unique and valueable NFTs.

## Inspiration

The inception of this project drew significant inspiration from Opensea, which stands as the largest and most renowned NFT marketplace on the Ethereum blockchain. Opensea's success and impact on the NFT ecosystem served as a driving force behind our project's creation.

## How we built it

The core smart contracts have been implemented using Threaded-Solidity (T-sol). Within the contracts folder of the project, you will find the source code organized in the following structure:

1. Abstract: This directory contains the extendable codebase that serves as a foundation for further implementations. It provides a set of abstract contracts that define common functionalities and interfaces, which can be inherited and built upon by other contracts in the project.
2. Additional: This directory houses the root or factory contracts responsible for deploying new contracts within the system. These contracts serve as the entry points for creating and initializing instances of other contracts in the project.
3. Interfaces: The interfaces directory contains the definition of interfaces, which specify the functions and events that other contracts can interact with. These interfaces serve as a communication standard, enabling seamless integration and interaction between different contracts within the project and external contracts.
4. Libraries: This directory holds reusable code modules in the form of libraries. These libraries contain commonly used functions and utilities that can be imported and utilized by other contracts. By utilizing libraries, code duplication is minimized, and efficiency and readability are improved.
5. Markets: The markets directory encompasses the contracts related to market functionality. These contracts define the core operations and rules governing the buying, selling, and trading of assets within the marketplace.
6. Structures: The structures directory contains the definitions of data structures used within the smart contracts. These structures define the layout and organization of data, ensuring efficient storage and retrieval of information within the contracts.

By organizing the smart contract source code in this structured manner, the project aims to enhance modularity, readability, and maintainability. Each directory serves a specific purpose, facilitating easier navigation and comprehension of the codebase.

The marketplace is designed to support various mechanisms for buying and selling digital assets. These mechanisms include:

1. Direct Buy: Users have the option to purchase digital assets directly at a fixed price. This straightforward method allows for instant transactions without the need for bidding or negotiation.
2. Dutch Auctioning: Dutch auctioning involves setting a high initial price for an asset, which gradually decreases over time until a buyer is found. This mechanism creates a sense of urgency and encourages users to make bids as they compete for the lowering price.
3. English Auctioning: In an English auction, the asset's price starts low and gradually increases as buyers place bids. The auction continues until no higher bids are received within a set time frame. If the auction recives a bid within the last 15 minutes, the auction time is extended with additional 15 minutes. The highest bidder at the end of the auction period wins the asset.
4. Open Bidding System: This mechanism allows potential buyers to make offers to NFT owners, indicating the price and tip3 token they are willing to pay for a particular digital asset. Asset owners can reveiw these offers and accept any of them based on their preferences by changing manager to the offer contract. Since these system is time bound, after expiry, the offeror can destroy their offer, thereby reclaiming their locked fund.

Additionally, the marketplace employs the TIP3 token standard as the means of payment. TIP3 tokens serve as the currency for buying and selling digital assets within the marketplace. This standard ensures compatibility and seamless integration with the marketplace's ecosystem.

Moreover, the marketplace offers NFT owners the ability to deploy a modular marketplace without the need to write a single line of code. This feature allows NFT owners to easily set up their own customized marketplace, specifying the buying and selling mechanisms they wish to implement per NFT. By eliminating the coding requirement, the marketplace enables a user-friendly and accessible experience for NFT owners, promoting broader participation in the buying and selling process.

## Challenges we ran into

In the initial stages, our plan was to deploy a minimal user interface (UI) to demonstrate the proof of concept within the limited timeframe of the approaching hackathon. However, due to time constraints, we had to adjust our strategy and prioritize the development of comprehensive test suites instead. Our aim was to showcase the functionality of our code through these tests.

During this accelerated process, we encountered a few challenges and ran into errors that needed to be addressed. Some of the errors we encountered included "Transaction aborted with code 51" and "Error: runLocal: Account is not deployed." These issues required careful investigation and debugging to identify the root causes and find appropriate solutions.

Despite these setbacks, we remained committed to delivering a working demonstration of our concept. We allocated additional time and resources to resolve the errors and ensure the reliability and functionality of our codebase.

It's worth noting that the fast-paced nature of the hackathon and the urgency to showcase our progress within a tight deadline contributed to the occurrence of these issues. However, by actively troubleshooting and addressing the errors, we were able to make significant progress and achieve a functional state for our proof of concept.

While the errors introduced some delays and challenges, we embraced them as learning opportunities and used them to refine our codebase. By overcoming these hurdles, we gained valuable insights and improved the overall stability and performance of our project.

Moving forward, we remain dedicated to ensuring a robust and error-free implementation of our solution, and we are committed to delivering a successful outcome despite the initial setbacks encountered during the hackathon.

## Accomplishments that we're proud of

- Programming on decentralized Threaded virtual machine (TVM)
- Writting asynchronous contracts with callbacks
- Building a deployable modular marketplace that supports Direct buy, English auction, Dutch auction and Open bidding (offer).
- Working with account abstraction

## What we learned

Throughout the duration of the project, our team encountered several hurdles and obstacles that significantly contributed to our knowledge and understanding. One of the key advantages we had was prior experience in building dApps with solidity, which laid a solid foundation for our understanding of the threaded-solidity language.

However, the project at hand presented us with a unique opportunity to delve even deeper into the intricacies of building decentralized applications and marketplaces. As we progressed, we faced specific challenges related to the design and implementation of callbacks for the marketplace.

These challenges ranged from addressing the asynchronous model of communication between accounts (smart contracts), scalability concerns and gas management to ensuring that the smart contract remains active and not frozen.

As we encountered and resolved some of these issues, we not only expanded our knowledge base but also gained a deeper understanding of the intricacies and nuances of asynchronous TVM dApp development. This enhanced expertise empowered us to make informed decisions, optimize our approach, and deliver a secure and reliable marketplace smart contracts for tip4 non-fungible tokens.

Overall, the challenges we faced during the project provided invaluable learning experiences and enabled us to further refine our skills in building decentralized applications.

## What's next...

Our roadmap consists of the following key steps:

1. Optimizing existing smart contracts: We plan to thoroughly review and enhance our current smart contracts to improve their efficiency, gas usage, and overall performance. This optimization process will ensure a smoother experience for users and reduce transaction costs.
2. Strengthening test suites: We will develop comprehensive and robust test suites to cover various scenarios and edge cases. By increasing the test coverage, we aim to enhance the reliability and security of our system, ensuring that it functions as intended.
3. Building a resilient backend: Our focus is on creating a robust backend infrastructure that will expose a well-documented API. This will enable third-party applications to seamlessly integrate with our platform, fostering a vibrant ecosystem around our marketplace.
4. Designing an intuitive user interface: We recognize the importance of providing users with a seamless and visually appealing experience. Our team is dedicated to crafting a user interface that mirrors the look and feel of opensea.io, ensuring familiarity and ease of use for our community.
5. Deployment across multiple networks: We aim to deploy our platform to different networks, starting with devnet and testnet environments for thorough testing and refinement. Ultimately, our goal is to launch on the anticipated Venom Mainnet, ensuring a secure and reliable experience for our users.
6. Gathering user feedback: We eagerly anticipate input from potential users to gain a deeper understanding of their needs and expectations. By actively seeking feedback, we can continuously improve and refine our product, ensuring that it aligns with the requirements of our user base.

By following this roadmap, we aim to deliver an optimized, resilient, and user-friendly marketplace for non-fungible tokens. Our iterative approach, combined with user feedback, will guide us in achieving our goal of creating a robust and highly regarded platform on the Venom ecosystem.
