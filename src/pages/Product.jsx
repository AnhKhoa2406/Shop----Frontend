import React, {

  useContext,

  useEffect,

  useRef,

  useState,

} from 'react'

import {

  useParams,

  useNavigate,

  Link,

} from 'react-router-dom'

import {

  ShopContext,

} from '../context/ShopContext'

import {

  assets,

} from '../assets/assets'

import RelatedProducts from '../components/RelatedProducts'

const formatVND = (value) => {

  const num = Number(value)

  if (isNaN(num)) {

    return value

  }

  return num.toLocaleString('vi-VN') + ' ₫'

}

const readList = (key) => {

  try {

    const raw =

      localStorage.getItem(key)

    return raw

      ? JSON.parse(raw)

      : []

  } catch {

    return []

  }

}

const writeList = (

  key,

  list

) => {

  try {

    localStorage.setItem(

      key,

      JSON.stringify(list)

    )

  } catch {

  }

}

const Product = () => {

  const {

    productId,

  } = useParams()

  const navigate =

    useNavigate()

  const {

    products,

    addToCart,

    wishlist,

    toggleWishlist,

    isInWishlist,

  } = useContext(

    ShopContext

  )

  const [

    productData,

    setProductData,

  ] = useState(false)

  const [

    image,

    setImage,

  ] = useState('')

  const [

    size,

    setSize,

  ] = useState('')

  const [

    color,

    setColor,

  ] = useState('')

  const [

    quantity,

    setQuantity,

  ] = useState(1)

  const [

    sizeError,

    setSizeError,

  ] = useState(false)

  const [

    activeTab,

    setActiveTab,

  ] = useState(

    'description'

  )

  const [

    justAdded,

    setJustAdded,

  ] = useState(false)

  const [addingToCart, setAddingToCart] = useState(false)

  const [

    compareList,

    setCompareList,

  ] = useState(() => {

    return readList(

      'compareList'

    )

  })

  const [

    shareOpen,

    setShareOpen,

  ] = useState(false)

  const [

    linkCopied,

    setLinkCopied,

  ] = useState(false)

  const shareRef =

    useRef(null)

  const [

    zoomActive,

    setZoomActive,

  ] = useState(false)

  const [

    zoomPos,

    setZoomPos,

  ] = useState({

    x: 50,

    y: 50,

  })

  const imageWrapRef =

    useRef(null)

  const [

    questions,

    setQuestions,

  ] = useState([])

  const [

    questionDraft,

    setQuestionDraft,

  ] = useState('')

  const isWished =

    productData

      ? isInWishlist(

          productData._id

        )

      : false

  const isComparing =

    productData

      ? compareList.includes(

          String(

            productData._id

          )

        )

      : false

  const fetchProductData =

    async () => {

      const found =

        products.find(

          (item) =>

            String(

              item._id

            ) ===

            String(

              productId

            )

        )

      if (found) {

        setProductData(

          found

        )

        if (

          found.image &&

          found.image.length > 0

        ) {

          setImage(

            found.image[0]

          )

        }

        if (

          found.colors &&

          found.colors.length > 0

        ) {

          setColor(

            found.colors[0]

          )

        }

        setQuestions(

          readList(

            `qna:${found._id}`

          )

        )

      }

    }

  useEffect(() => {

    if (

      products &&

      products.length > 0

    ) {

      fetchProductData()

    }

  }, [

    productId,

    products,

  ])

  useEffect(() => {

    const handleClick = (

      e

    ) => {

      if (

        shareRef.current &&

        !shareRef.current.contains(

          e.target

        )

      ) {

        setShareOpen(

          false

        )

      }

    }

    document.addEventListener(

      'mousedown',

      handleClick

    )

    return () => {

      document.removeEventListener(

        'mousedown',

        handleClick

      )

    }

  }, [])

  const outOfStock =

    productData &&

    typeof productData.stock ===

      'number' &&

    productData.stock <= 0

  const lowStock =

    productData &&

    typeof productData.stock ===

      'number' &&

    productData.stock > 0 &&

    productData.stock <= 5

  const handleAddToCart = async () => {
    if (!size || !productData || addingToCart) {
      if (!size) {
        setSizeError(true);
      }
      return;
    }

    setSizeError(false);
    setAddingToCart(true);

    try {
      await addToCart(productData._id, size, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist =

    () => {

      if (

        !productData

      ) {

        return

      }

      toggleWishlist(

        productData._id

      )

    }

  const toggleCompare = () => {

    if (

      !productData

    ) {

      return

    }

    const productIdString =

      String(

        productData._id

      )

    const next =

      isComparing

        ? compareList.filter(

            (id) =>

              String(id) !==

              productIdString

          )

        : [

            ...compareList,

            productData._id,

          ].slice(-4)

    setCompareList(

      next

    )

    writeList(

      'compareList',

      next

    )

  }

  const handleCopyLink =

    async () => {

      try {

        await navigator.clipboard.writeText(

          window.location.href

        )

        setLinkCopied(

          true

        )

        setTimeout(

          () => {

            setLinkCopied(

              false

            )

          },

          1500

        )

      } catch {

      }

    }

  const shareUrl =

    typeof window !== 'undefined'

      ? window.location.href

      : ''

  const shareText =

    productData

      ? productData.name

      : ''

  const handleMouseMoveZoom = (

    e

  ) => {

    if (

      !imageWrapRef.current

    ) {

      return

    }

    const rect =

      imageWrapRef.current.getBoundingClientRect()

    const x =

      ((e.clientX -

        rect.left) /

        rect.width) *

      100

    const y =

      ((e.clientY -

        rect.top) /

        rect.height) *

      100

    setZoomPos({

      x: Math.min(

        100,

        Math.max(

          0,

          x

        )

      ),

      y: Math.min(

        100,

        Math.max(

          0,

          y

        )

      ),

    })

  }

  const handleAskQuestion =

    () => {

      const text =

        questionDraft.trim()

      if (

        !text ||

        !productData

      ) {

        return

      }

      const next = [

        {

          id: Date.now(),

          text,

          date:

            new Date().toLocaleDateString(

              'vi-VN'

            ),

        },

        ...questions,

      ]

      setQuestions(

        next

      )

      writeList(

        `qna:${productData._id}`,

        next

      )

      setQuestionDraft(

        ''

      )

    }

  return productData ? (

    <div className="pt-6 pb-20 transition-opacity ease-in duration-500 opacity-100 sm:pt-10">

      <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">

        <Link

          to="/"

          className="transition-colors hover:text-orange-500"

        >

          Trang chủ

        </Link>

        <span>

          /

        </span>

        <Link

          to="/collection"

          className="transition-colors hover:text-orange-500"

        >

          Sản phẩm

        </Link>

        {productData.category && (

          <>

            <span>

              /

            </span>

            <span className="text-gray-500">

              {

                productData.category

              }

            </span>

          </>

        )}

      </div>

      <div className="flex flex-col gap-10 sm:flex-row sm:gap-14">

        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">

          <div className="flex w-full justify-start gap-3 overflow-x-auto sm:w-[18%] sm:flex-col sm:overflow-y-auto">

            {productData.image &&

              productData.image.map(

                (

                  item,

                  index

                ) => (

                  <button

                    onClick={() =>

                      setImage(

                        item

                      )

                    }

                    key={

                      index

                    }

                    aria-label={`Xem ảnh ${index + 1}`}

                    className={`aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 sm:mb-3 sm:w-full ${

                      item === image

                        ? 'border-orange-500'

                        : 'border-gray-200 hover:border-orange-300'

                    }`}

                  >

                    <img

                      src={

                        item

                      }

                      className="h-full w-full object-cover"

                      alt=""

                    />

                  </button>

                )

              )}

          </div>

          <div className="relative w-full sm:w-[82%]">

            <div

              ref={

                imageWrapRef

              }

              onMouseEnter={() =>

                setZoomActive(

                  true

                )

              }

              onMouseLeave={() =>

                setZoomActive(

                  false

                )

              }

              onMouseMove={

                handleMouseMoveZoom

              }

              className="relative aspect-square cursor-zoom-in overflow-hidden rounded-xl bg-gray-50"

            >

              <img

                src={

                  image

                }

                alt={

                  productData.name

                }

                className="h-full w-full object-cover transition-transform duration-150 ease-out"

                style={

                  zoomActive

                    ? {

                        transform:

                          'scale(2)',

                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,

                      }

                    : undefined

                }

              />

            </div>

            <div className="absolute right-3 top-3 flex flex-col gap-2">

              <button

                type="button"

                onClick={

                  handleToggleWishlist

                }

                aria-label={

                  isWished

                    ? 'Bỏ khỏi yêu thích'

                    : 'Thêm vào yêu thích'

                }

                aria-pressed={

                  isWished

                }

                className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur transition active:scale-90 ${

                  isWished

                    ? 'bg-orange-500 text-white'

                    : 'bg-white/90 text-gray-600 hover:text-orange-500'

                }`}

              >

                <span

                  aria-hidden="true"

                  className="text-lg leading-none"

                >

                  {

                    isWished

                      ? '♥'

                      : '♡'

                  }

                </span>

              </button>

              <div

                className="relative"

                ref={

                  shareRef

                }

              >

                <button

                  type="button"

                  onClick={() =>

                    setShareOpen(

                      (value) =>

                        !value

                    )

                  }

                  aria-label="Chia sẻ sản phẩm"

                  aria-expanded={

                    shareOpen

                  }

                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md transition active:scale-90 hover:text-orange-500"

                >

                  <span

                    aria-hidden="true"

                  >

                    ⤴

                  </span>

                </button>

                {shareOpen && (

                  <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-100 bg-white py-1.5 shadow-xl">

                    <button

                      type="button"

                      onClick={

                        handleCopyLink

                      }

                      className="w-full px-3 py-2 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-orange-600"

                    >

                      {

                        linkCopied

                          ? 'Đã sao chép ✓'

                          : 'Sao chép liên kết'

                      }

                    </button>

                    <a

                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}

                      target="_blank"

                      rel="noreferrer"

                      className="block px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-orange-600"

                    >

                      Chia sẻ lên Facebook

                    </a>

                    <a

                      href={`https://zalo.me/share?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(shareText)}`}

                      target="_blank"

                      rel="noreferrer"

                      className="block px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-orange-600"

                    >

                      Chia sẻ qua Zalo

                    </a>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

        <div className="flex-1">

          <h1 className="text-2xl font-semibold leading-snug tracking-tight text-gray-900 sm:text-3xl">

            {

              productData.name

            }

          </h1>

          <div className="mt-3 flex items-center gap-1">

            <img

              src={

                assets.star_icon

              }

              alt=""

              className="w-3.5"

            />

            <img

              src={

                assets.star_icon

              }

              alt=""

              className="w-3.5"

            />

            <img

              src={

                assets.star_icon

              }

              alt=""

              className="w-3.5"

            />

            <img

              src={

                assets.star_icon

              }

              alt=""

              className="w-3.5"

            />

            <img

              src={

                assets.star_dull_icon

              }

              alt=""

              className="w-3.5"

            />

            <p className="pl-2 text-sm text-gray-500">

              (122 đánh giá)

            </p>

          </div>

          <p className="mt-5 text-3xl font-bold text-orange-600 sm:text-4xl">

            {

              formatVND(

                productData.price

              )

            }

          </p>

          <p className="mt-5 leading-relaxed text-gray-500 md:w-4/5">

            {

              productData.description

            }

          </p>

          {typeof productData.stock ===

            'number' && (

            <p className={`mt-4 text-sm font-medium ${

              outOfStock

                ? 'text-red-500'

                : lowStock

                  ? 'text-orange-500'

                  : 'text-gray-500'

            }`}>

              {

                outOfStock

                  ? 'Hết hàng'

                  : lowStock

                    ? `Chỉ còn ${productData.stock} sản phẩm`

                    : 'Còn hàng'

              }

            </p>

          )}

          {productData.colors &&

            productData.colors.length >

              0 && (

              <div className="mt-7 flex flex-col gap-3">

                <div className="flex items-center justify-between md:w-4/5">

                  <p className="font-semibold text-gray-800">

                    Chọn màu

                  </p>

                  {color && (

                    <p className="text-sm text-gray-400">

                      Đã chọn:

                      <span className="ml-1 font-medium text-gray-700">

                        {

                          color

                        }

                      </span>

                    </p>

                  )}

                </div>

                <div className="flex flex-wrap gap-2">

                  {productData.colors.map(

                    (

                      c,

                      index

                    ) => (

                      <button

                        type="button"

                        key={

                          index

                        }

                        onClick={() =>

                          setColor(

                            c

                          )

                        }

                        title={

                          c

                        }

                        aria-label={`Màu ${c}`}

                        className={`h-9 w-9 rounded-full border-2 transition active:scale-90 ${

                          c === color

                            ? 'border-orange-500 ring-2 ring-orange-200'

                            : 'border-gray-200 hover:border-orange-300'

                        }`}

                        style={{

                          backgroundColor:

                            c,

                        }}

                      />

                    )

                  )}

                </div>

              </div>

            )}

          {productData.sizes &&

            productData.sizes.length >

              0 && (

              <div className="mt-7 flex flex-col gap-3">

                <div className="flex items-center justify-between md:w-4/5">

                  <p className="font-semibold text-gray-800">

                    Chọn kích cỡ

                  </p>

                  {size && (

                    <p className="text-sm text-gray-400">

                      Đã chọn:

                      <span className="ml-1 font-medium text-gray-700">

                        {

                          size

                        }

                      </span>

                    </p>

                  )}

                </div>

                <div className="flex flex-wrap gap-2">

                  {productData.sizes.map(

                    (

                      item,

                      index

                    ) => (

                      <button

                        type="button"

                        onClick={() => {

                          setSize(

                            item

                          )

                          setSizeError(

                            false

                          )

                        }}

                        className={`min-w-[52px] rounded-lg border px-4 py-2 text-sm font-medium transition active:scale-95 ${

                          item === size

                            ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm'

                            : 'border-gray-300 bg-gray-100 text-gray-600 hover:border-orange-300 hover:text-orange-600'

                        }`}

                        key={

                          index

                        }

                      >

                        {

                          item

                        }

                      </button>

                    )

                  )}

                </div>

                {sizeError && (

                  <p className="text-sm text-red-500">

                    Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng.

                  </p>

                )}

              </div>

            )}

          <div className="mt-8 flex flex-wrap items-center gap-4">

            <div className="flex items-center rounded-xl border border-gray-300">

              <button

                type="button"

                onClick={() =>

                  setQuantity(

                    (q) =>

                      Math.max(

                        1,

                        q - 1

                      )

                  )

                }

                className="flex h-11 w-10 items-center justify-center text-gray-500 transition hover:text-orange-600 disabled:opacity-30"

                disabled={

                  quantity <= 1

                }

                aria-label="Giảm số lượng"

              >

                −

              </button>

              <span className="w-8 text-center text-sm font-medium text-gray-800">

                {

                  quantity

                }

              </span>

              <button

                type="button"

                onClick={() =>

                  setQuantity(

                    (q) =>

                      q + 1

                  )

                }

                className="flex h-11 w-10 items-center justify-center text-gray-500 transition hover:text-orange-600"

                aria-label="Tăng số lượng"

              >

                +

              </button>

            </div>

            <button

              type="button"

              onClick={

                handleAddToCart

              }

              disabled={

                outOfStock || addingToCart

              }

              className={`flex-1 rounded-xl px-10 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 active:translate-y-0 sm:flex-none ${

                outOfStock || addingToCart

                  ? 'cursor-not-allowed bg-gray-400 opacity-40'

                  : justAdded

                    ? 'bg-green-600 shadow-green-200'

                    : 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-200 hover:-translate-y-0.5 hover:shadow-xl'

              }`}

            >

              {

                outOfStock

                  ? 'HẾT HÀNG'

                  : addingToCart

                    ? 'ĐANG THÊM...'

                    : justAdded

                      ? 'ĐÃ THÊM ✓'

                      : 'THÊM VÀO GIỎ HÀNG'

              }

            </button>

            <button

              type="button"

              onClick={

                toggleCompare

              }

              className={`rounded-xl border px-5 py-3.5 text-sm font-medium transition active:scale-95 ${

                isComparing

                  ? 'border-orange-500 bg-orange-50 text-orange-600'

                  : 'border-gray-300 text-gray-600 hover:border-orange-300 hover:text-orange-600'

              }`}

            >

              {

                isComparing

                  ? 'Đang so sánh ✓'

                  : 'Thêm vào so sánh'

              }

            </button>

          </div>

          <hr className="mt-8 border-gray-200 sm:w-4/5" />

          <div className="mt-5 flex flex-col gap-2 text-sm text-gray-500">

            <p className="flex items-center gap-2">

              <span className="text-orange-500">

                ✓

              </span>

              Sản phẩm chính hãng 100%.

            </p>

            <p className="flex items-center gap-2">

              <span className="text-orange-500">

                ✓

              </span>

              Hỗ trợ thanh toán khi nhận hàng (COD).

            </p>

            <p className="flex items-center gap-2">

              <span className="text-orange-500">

                ✓

              </span>

              Đổi trả dễ dàng trong vòng 7 ngày.

            </p>

          </div>

        </div>

      </div>

      {compareList.length > 0 && (

        <div className="fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 rounded-full bg-gray-900 px-5 py-3 text-white shadow-xl">

          <span className="text-sm">

            Đang so sánh {

              compareList.length

            } sản phẩm

          </span>

          <button

            type="button"

            onClick={() =>

              navigate(

                '/compare'

              )

            }

            className="rounded-full bg-orange-500 px-4 py-1.5 text-sm font-semibold transition hover:bg-orange-600"

          >

            Xem so sánh

          </button>

          <button

            type="button"

            onClick={() => {

              setCompareList(

                []

              )

              writeList(

                'compareList',

                []

              )

            }}

            aria-label="Xoá danh sách so sánh"

            className="text-gray-400 transition hover:text-white"

          >

            ✕

          </button>

        </div>

      )}

      <div className="mt-16 sm:mt-20">

        <div className="flex overflow-x-auto border-b border-gray-200">

          {[

            {

              key: 'description',

              label: 'Mô tả sản phẩm',

            },

            {

              key: 'reviews',

              label: 'Đánh giá (122)',

            },

            {

              key: 'qna',

              label: `Hỏi đáp (${questions.length})`,

            },

          ].map(

            (tab) => (

              <button

                type="button"

                key={

                  tab.key

                }

                onClick={() =>

                  setActiveTab(

                    tab.key

                  )

                }

                className={`relative whitespace-nowrap px-5 py-3 text-sm transition-colors ${

                  activeTab ===

                  tab.key

                    ? 'font-semibold text-gray-900'

                    : 'text-gray-500 hover:text-orange-500'

                }`}

              >

                {

                  tab.label

                }

                {activeTab ===

                  tab.key && (

                  <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-orange-500" />

                )}

              </button>

            )

          )}

        </div>

        {activeTab ===

        'description' ? (

          <div className="flex flex-col gap-4 px-1 py-6 text-sm leading-relaxed text-gray-600">

            <p>

              Website thương mại điện tử là nền tảng trực tuyến giúp việc mua bán sản phẩm hoặc dịch vụ diễn ra qua internet một cách thuận tiện. Đây là nơi doanh nghiệp và cá nhân có thể trưng bày sản phẩm, tương tác với khách hàng và thực hiện giao dịch mà không cần cửa hàng vật lý. Nhờ sự tiện lợi, dễ tiếp cận và khả năng tiếp cận khách hàng trên phạm vi rộng, thương mại điện tử ngày càng trở nên phổ biến.

            </p>

            <p>

              Mỗi sản phẩm thường có trang riêng với đầy đủ thông tin mô tả chi tiết, hình ảnh, giá bán và các tùy chọn khác nhau (như kích cỡ, màu sắc) để khách hàng dễ dàng lựa chọn.

            </p>

          </div>

        ) : activeTab ===

          'reviews' ? (

          <div className="flex flex-col items-center gap-2 py-14 text-center text-sm text-gray-400">

            <p>

              Chưa có đánh giá nào.

            </p>

            <p>

              Hãy là người đầu tiên đánh giá sản phẩm này!

            </p>

          </div>

        ) : (

          <div className="flex flex-col gap-6 px-1 py-6">

            <div className="flex flex-col gap-3 sm:flex-row">

              <input

                value={

                  questionDraft

                }

                onChange={(e) =>

                  setQuestionDraft(

                    e.target.value

                  )

                }

                onKeyDown={(e) => {

                  if (

                    e.key ===

                    'Enter'

                  ) {

                    handleAskQuestion()

                  }

                }}

                placeholder="Đặt câu hỏi về sản phẩm này..."

                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"

              />

              <button

                type="button"

                onClick={

                  handleAskQuestion

                }

                className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"

              >

                Gửi câu hỏi

              </button>

            </div>

            {questions.length ===

            0 ? (

              <p className="py-8 text-center text-sm text-gray-400">

                Chưa có câu hỏi nào. Hãy là người đầu tiên hỏi!

              </p>

            ) : (

              <ul className="flex flex-col gap-4">

                {questions.map(

                  (q) => (

                    <li

                      key={

                        q.id

                      }

                      className="rounded-lg border border-gray-200 px-4 py-3"

                    >

                      <p className="text-sm text-gray-700">

                        {

                          q.text

                        }

                      </p>

                      <p className="mt-1 text-xs text-gray-400">

                        {

                          q.date

                        }

                        {' · '}

                        Chưa có phản hồi

                      </p>

                    </li>

                  )

                )}

              </ul>

            )}

          </div>

        )}

      </div>

      <RelatedProducts

        category={

          productData.category

        }

        subCategory={

          productData.subCategory

        }

        currentId={

          productData._id

        }

      />

    </div>

  ) : (

    <div className="opacity-0" />

  )

}

export default Product