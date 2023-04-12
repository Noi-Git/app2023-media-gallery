import classNames from 'classnames'

const Skeleton = ({ times }) => {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5'
  )
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  )

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      // (_, i):  _ mean, we don't care about that first argument; we only need index
      return (
        <div key={i} classNames={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      )
    })
  return boxes
}

export default Skeleton
