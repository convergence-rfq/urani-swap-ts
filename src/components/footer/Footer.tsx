export default function Footer() {
  return (
    <footer className="bg-transparent text-cyan-500">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
            {/* Add your footer links or content here */}
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between">
          <a href="https://www.urani.trade" rel="noopener noreferrer">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base text-white">
                <b>Back to convergence.trade</b>
              </span>
            </div>
          </a>
          <div className="flex flex-col sm:flex-row items-center order-2 sm:order-1">
            <div className="flex sm:justify-center items-center mb-8 sm:mb-0 ">
              <a
                href="https://github.com/convergence-rfq"
                className="text-white hover:underline text-sm sm:text-base sm:mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <b>Developers</b>
                </span>
              </a>
              <a
                href="https://www.convergence.so/tos"
                className="text-white hover:underline text-sm sm:text-base sm:mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <b>Terms</b>
                </span>
              </a>
              <a
                href="https://www.convergence.so/privacy"
                className="text-white hover:underline text-sm sm:text-base sm:mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <b>Privacy</b>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
