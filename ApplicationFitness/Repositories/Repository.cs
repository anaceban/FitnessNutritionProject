using ApplicationFitness;
using ApplicationFitness.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WebApi.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly FitnessAppContext _context;
        protected readonly DbSet<T> _dbSet;
        public Repository(FitnessAppContext dbContext)
        {
            _context = dbContext;
            _dbSet = dbContext.Set<T>();
        }
        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public T Find(int id)
        {
            return _dbSet.FirstOrDefault(x => x.Id == id);
        }

        public T Find(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.FirstOrDefault(predicate);
        }

        public IQueryable<T> FindAll(Expression<Func<T, bool>> predicate)
        {
            return _dbSet.Where(predicate);
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet.OrderByDescending(x => x.Id);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public T Update(T entity)
        {
            return _dbSet.Update(entity).Entity;
        }
    }
}
