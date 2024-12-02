export default function PriceRange() {
  return (
    <div className="flex w-full flex-col space-y-2 text-xs rounded-xl border border-transparent bg-[#131b24] p-4 focus-within:border-[#c7f28280]/50 focus-within:shadow-swap-input-dark">
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className="flex flex-row items-center space-x-1 font-medium text-[#e8f9ff80]/50">
          Price Range (optional) {" "}
          <div className="ml-1">
            <div className="fill-current text-white/25">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="inherit"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.83337 3.56012C6.83337 4.02043 6.46024 4.39309 5.99994 4.39309C5.53963 4.39309 5.1665 4.02043 5.1665 3.56012C5.1665 3.09981 5.53963 2.72668 5.99994 2.72668C6.46024 2.72668 6.83337 3.09981 6.83337 3.56012Z"
                  fill="inherit"
                ></path>
                <path
                  d="M6.69319 5.84293V8.58985C6.69319 8.97282 6.38288 9.28313 5.99992 9.28313C5.61695 9.28313 5.30664 8.97282 5.30664 8.58985V5.84293C5.30664 5.46043 5.61695 5.14966 5.99992 5.14966C6.38288 5.14966 6.69319 5.46043 6.69319 5.84293Z"
                  fill="inherit"
                ></path>
                <path
                  d="M6 0C2.68644 0 0 2.68644 0 6C0 9.31356 2.68644 12 6 12C9.31356 12 12 9.31356 12 6C12 2.68644 9.31356 0 6 0ZM9.4884 9.4884C8.5659 10.4264 7.3068 10.9574 5.991 10.9631C4.67568 10.9687 3.41196 10.4484 2.48196 9.51792C1.55149 8.58792 1.03116 7.3242 1.0368 6.00888C1.04243 4.69308 1.57352 3.43404 2.51148 2.51148C3.43398 1.57351 4.69308 1.04244 6.00888 1.0368C7.3242 1.03118 8.58792 1.55149 9.51792 2.48196C10.4484 3.41196 10.9687 4.67568 10.9631 5.991C10.9575 7.3068 10.4264 8.56584 9.4884 9.4884Z"
                  fill="inherit"
                ></path>
                <path
                  d="M6 0C2.68644 0 0 2.68644 0 6C0 9.31356 2.68644 12 6 12C9.31356 12 12 9.31356 12 6C12 2.68644 9.31356 0 6 0ZM9.4884 9.4884C8.5659 10.4264 7.3068 10.9574 5.991 10.9631C4.67568 10.9687 3.41196 10.4484 2.48196 9.51792C1.55149 8.58792 1.03116 7.3242 1.0368 6.00888C1.04243 4.69308 1.57352 3.43404 2.51148 2.51148C3.43398 1.57351 4.69308 1.04244 6.00888 1.0368C7.3242 1.03118 8.58792 1.55149 9.51792 2.48196C10.4484 3.41196 10.9687 4.67568 10.9631 5.991C10.9575 7.3068 10.4264 8.56584 9.4884 9.4884Z"
                  fill="inherit"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="group flex items-center gap-x-1 text-white/50">
          <p className="group-hover:text-v2-primary">Rate:</p>
          <div className="flex cursor-pointer items-center space-x-1 group-hover:text-v2-primary">
            <span>0.00416</span>
            <span className="text-xxs">USDC / SOL</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
            <input type="text" placeholder="Min Price" className="h-10 w-full text-white disabled:cursor-not-allowed focus:ring-0 disabled:text-black border-none disabled:opacity-100 text-xl rounded-md !bg-[#18222D] px-4 py-0 !text-left !font-semibold placeholder:text-sm !text-v2-lily !outline-none placeholder:!text-[#e8f9ff]/25" value="10"/>

            <span className="flex text-sm font-semibold text-white">-</span>

            <input type="text" placeholder="Max Price" className="h-10 w-full text-white disabled:cursor-not-allowed disabled:text-black border-none placeholder:text-sm disabled:opacity-100 text-xl focus:ring-0 rounded-md !bg-[#18222D] px-4 py-0 !text-left !font-semibold !text-v2-lily !outline-none placeholder:!text-[#e8f9ff]/25" value="20"/>
        </div>
    </div>
  );
}
