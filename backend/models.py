from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from databases import Database

DATABASE_URL = "postgresql://user:password@localhost/dbname"

database = Database(DATABASE_URL)
Base = declarative_base()

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    temperature = Column(Float)
    current = Column(Float)
    charge_rate = Column(Float)
    discharge_rate = Column(Float)
    results = Column(String) 

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

from sqlalchemy import create_engine
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)