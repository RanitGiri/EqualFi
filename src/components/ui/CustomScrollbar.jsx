export function CustomScrollbar() {
  return (
    <style jsx global>{`
      ::-webkit-scrollbar {
        width: 12px;
      }

      ::-webkit-scrollbar-track {
        background: #010514;
        border-left: 1px solid rgba(120, 160, 255, 0.1);
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #78a0ff 0%, #4d7fd9 100%);
        border-radius: 10px;
        border: 2px solid #010514;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #8fb0ff 0%, #5d8de9 100%);
        box-shadow: 0 0 10px rgba(120, 160, 255, 0.5);
      }

      * {
        scrollbar-width: thin;
        scrollbar-color: #78a0ff #010514;
      }

      * {
        cursor: none !important;
      }
    `}</style>
  )
}